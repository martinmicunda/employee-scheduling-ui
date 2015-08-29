/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import FormService from './form.js';

describe('FormService', () => {

    let formService, saveButtonOptions = {
        iconsPosition: 'right',
        buttonDefaultText: 'Save',
        buttonSubmittingText: 'Saving',
        buttonSuccessText: 'Saved'
    };

    beforeEach(() => {
        formService = new FormService();
    });

    it(`should have 'saveButtonOptions' property`, () => {
        expect(formService.saveButtonOptions).toEqual(saveButtonOptions);
    });

    it(`should get modal saveButtonOptions`, () => {
        let saveButtonOptionsCloned = Object.assign({}, saveButtonOptions);
        saveButtonOptionsCloned.animationCompleteTime = '0';
        saveButtonOptionsCloned.buttonErrorClass = 'btn-success';

        expect(formService.getModalSaveButtonOptions()).toEqual(saveButtonOptionsCloned);
    });

    it(`should get saveButtonOptions`, () => {
        let saveButtonOptionsCloned = Object.assign({}, saveButtonOptions);
        saveButtonOptionsCloned.animationCompleteTime = '1200';
        saveButtonOptionsCloned.buttonErrorClass = 'btn-danger';

        expect(formService.getSaveButtonOptions()).toEqual(saveButtonOptionsCloned);
    });

    describe('onSuccess', () => {
        it(`should set hasError to false`, () => {
            let self = {};

            formService.onSuccess(self);

            expect(self.hasError).toEqual(false);
        });

        it(`should set result to 'success'`, () => {
            let self = {};

            formService.onSuccess(self);

            expect(self.result).toEqual('success');
        });

        it(`should execute cancel if it is a function`, () => {
            let self = {
                cancel: function() {}
            };
            spyOn(self, 'cancel');

            formService.onSuccess(self);

            expect(self.cancel).toHaveBeenCalled();
        });
    });

    describe('onFailure', () => {
        it(`should set hasError to true`, () => {
            let self = {}, response = {status: 404};

            formService.onFailure(self, response);

            expect(self.hasError).toEqual(true);
        });

        it(`should set result to 'error'`, () => {
            let self = {}, response = {status: 404};

            formService.onFailure(self, response);

            expect(self.result).toEqual('error');
        });

        it(`should return error message for 404 error response`, () => {
            let self = {}, response = {status: 404};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('The requested record could not be found.');
        });

        it(`should return error message for 409 PUT error response`, () => {
            let self = {}, response = {status: 409, config: {method: 'PUT'}};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('Another user has updated this record while you were editing. Please reload the page and try again.');
        });

        it(`should return error message for 409 POST error response`, () => {
            let self = {}, response = {status: 409, config: {method: 'POST'}};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('This record already exist.');
        });

        it(`should return error message for POST request`, () => {
            let self = {}, response = {config: {method: 'POST'}};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('This record could not be created. Please try again.');
        });

        it(`should return error message for PUT request`, () => {
            let self = {}, response = {config: {method: 'PUT'}};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('This record could not be updated. Please try again.');
        });

        it(`should return error message for DELETE request`, () => {
            let self = {}, response = {config: {method: 'DELETE'}};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('This record could not be deleted. Please try again.');
        });
    });

    describe('', () => {
        let $q, $rootScope, model, form, self = {}, item = 'item', response = {status: 404};

        beforeEach(inject((_$q_, _$rootScope_) => {
            $q = _$q_;
            $rootScope = _$rootScope_;

            model = {
                save: function () {},
                delete: function() {}
            };

            form = {
                $setPristine: function () {}
            };

            spyOn(form, '$setPristine');
        }));

        describe('save', () => {
            it(`should save data successfully`, () => {
                spyOn(model, 'save').and.returnValue($q.when());

                formService.save(model, item, self, form);

                $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

                expect(self.result).toEqual('success');
                expect(model.save).toHaveBeenCalledWith(item);
            });

            it(`should save data with failure`, () => {
                spyOn(model, 'save').and.returnValue($q.reject(response));

                formService.save(model, item, self, form);

                $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

                expect(self.result).toEqual('error');
                expect(model.save).toHaveBeenCalledWith(item);
            });

            it(`should call form $setPristine function`, () => {
                spyOn(model, 'save').and.returnValue($q.reject(response));

                formService.save(model, item, self, form);

                $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

                expect(self.result).toEqual('error');
                expect(form.$setPristine).toHaveBeenCalled();
            });
        });

        describe('delete', () => {
            it(`should delete data successfully`, () => {
                spyOn(model, 'delete').and.returnValue($q.when());

                formService.delete(model, item, self);

                $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

                expect(self.result).toEqual('success');
                expect(model.delete).toHaveBeenCalledWith(item);
            });

            it(`should delete data with failure`, () => {
                spyOn(model, 'delete').and.returnValue($q.reject(response));

                formService.delete(model, item, self);

                $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

                expect(self.result).toEqual('error');
                expect(model.delete).toHaveBeenCalledWith(item);
            });
        });
    });
});
