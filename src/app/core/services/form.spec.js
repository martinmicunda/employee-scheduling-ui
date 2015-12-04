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
    }, formSteps = [
        {route: 'route0', formName: 'form0', valid: false},
        {route: 'route1', formName: 'form1', valid: true},
        {route: 'route2', formName: 'form2', valid: true},
        {route: 'route3', formName: 'form3', valid: false},
        {route: 'route4', formName: 'form4', valid: true},
        {route: 'route5', formName: 'form5', valid: true}
    ], model = { getItem: () => {return {adminEmail: 'fakeItem'};} };

    beforeEach(() => {
        formService = new FormService(model);
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

        it(`should return error message for 400 error response`, () => {
            let self = {}, response = {status: 400, data: {message: 'test-message'}};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual(response.data.message);
        });

        it(`should return error message for 401 error response`, () => {
            let self = {}, response = {status: 401};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('Wrong email or password.');
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

        it(`should return error message for 503 error response`, () => {
            let self = {}, response = {status: 503};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual('The service went down. Please try again later.');
        });

        it(`should return error message for 500 error response`, () => {
            let self = {}, response = {config: {method: 'POST'}};

            formService.onFailure(self, response);

            expect(self.errorMessage).toEqual(`Something went wrong. Please contact the site administrator ${model.getItem().adminEmail}.`);
        });
    });

    describe('', () => {
        let self = {}, item = 'item', response = {status: 404},
        model = { save: () => {}, delete: () => {} }, form = { $setPristine: () => {} };

        describe('save', () => {
            // Promise.finally is missing in the ES6 spec so we have to add our own version
            Promise.prototype.finally = function (callback) {
                let p = this.constructor;
                return this.then(
                        value  => p.resolve(callback()).then(() => value),
                        reason => p.resolve(callback()).then(() => { throw reason; })
                );
            };

            itAsync(`should save data successfully`, () => {
                spyOn(model, 'save').and.returnValue(Promise.resolve());

                return formService.save(model, item, self, form).then(() => {
                    expect(self.result).toEqual('success');
                    expect(model.save).toHaveBeenCalledWith(item);
                });
            });

            itAsync(`should save data with failure`, () => {
                spyOn(model, 'save').and.returnValue(Promise.reject(response));

                return formService.save(model, item, self, form).then(() => {
                }, (error) => {
                    expect(error).toEqual(response);
                    expect(self.result).toEqual('error');
                    expect(model.save).toHaveBeenCalledWith(item);
                });
            });

            itAsync(`should call form $setPristine function`, () => {
                spyOn(form, '$setPristine');
                spyOn(model, 'save').and.returnValue(Promise.reject(response));

                return formService.save(model, item, self, form).then(() => {
                }, () => {
                    expect(self.result).toEqual('error');
                    expect(form.$setPristine).toHaveBeenCalled();
                });
            });
        });

        describe('delete', () => {
            itAsync(`should delete data successfully`, () => {
                spyOn(model, 'delete').and.returnValue(Promise.resolve());

                return formService.delete(model, item, self).then(() => {
                    expect(self.result).toEqual('success');
                    expect(model.delete).toHaveBeenCalledWith(item);
                });
            });

            itAsync(`should delete data with failure`, () => {
                spyOn(model, 'delete').and.returnValue(Promise.reject(response));

                return formService.delete(model, item, self).then(() => {
                }, () => {
                    expect(self.result).toEqual('error');
                    expect(model.delete).toHaveBeenCalledWith(item);
                });
            });
        });
    });

    describe('submitChildForm', () => {
        it(`should submit child form for step one`, () => {
            let currentState = formSteps[0].route, form = {form0: {$valid: true}};

            expect(formSteps[0].valid).toEqual(false);

            formService.submitChildForm(currentState, form, formSteps);

            expect(form.form0.$submitted).toEqual(true);
            expect(formSteps[0].valid).toEqual(true);
        });

        it(`should submit child form for step four`, () => {
            let currentState = formSteps[3].route, form = {form0: {$valid: true}, form3: {$valid: true}};

            expect(formSteps[3].valid).toEqual(false);

            formService.submitChildForm(currentState, form, formSteps);

            expect(form.form3.$submitted).toEqual(true);
            expect(formSteps[3].valid).toEqual(true);
        });
    });

    describe('previousState', () => {
        it(`should go to previous state ${formSteps[4].route}`, () => {
            let currentState = formSteps[5].route;
            let previousState = formService.previousState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[4].route);
        });

        it(`should go to previous state ${formSteps[3].route}`, () => {
            let currentState = formSteps[4].route;
            let previousState = formService.previousState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[3].route);
        });

        it(`should go to previous state ${formSteps[2].route}`, () => {
            let currentState = formSteps[3].route;
            let previousState = formService.previousState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[2].route);
        });

        it(`should go to previous state ${formSteps[1].route}`, () => {
            let currentState = formSteps[2].route;
            let previousState = formService.previousState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[1].route);
        });

        it(`should go to previous state ${formSteps[0].route}`, () => {
            let currentState = formSteps[1].route;
            let previousState = formService.previousState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[0].route);
        });
    });

    describe('nextState', () => {
        it(`should go to next state ${formSteps[1].route}`, () => {
            let currentState = formSteps[0].route;
            let previousState = formService.nextState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[1].route);
        });

        it(`should go to next state ${formSteps[2].route}`, () => {
            let currentState = formSteps[1].route;
            let previousState = formService.nextState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[2].route);
        });

        it(`should go to next state ${formSteps[3].route}`, () => {
            let currentState = formSteps[2].route;
            let previousState = formService.nextState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[3].route);
        });

        it(`should go to next state ${formSteps[4].route}`, () => {
            let currentState = formSteps[3].route;
            let previousState = formService.nextState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[4].route);
        });

        it(`should go to next state ${formSteps[5].route}`, () => {
            let currentState = formSteps[4].route;
            let previousState = formService.nextState(currentState, formSteps);

            expect(previousState).toEqual(formSteps[5].route);
        });
    });

    describe('hasInvalidChildForms', () => {
        it(`should go to invalid child form`, () => {
            formSteps[0].valid = false;
            let router = {
                go: function() {}
            };
            spyOn(router, 'go');
            let invalidForm = formService.hasInvalidChildForms(router, formSteps);

            expect(invalidForm).toBeDefined();
            expect(router.go).toHaveBeenCalledWith(formSteps[0].route);
        });

        it(`should not go to invalid child form if form is valid`, () => {
            formSteps[0].valid = true;
            let router = {
                go: function() {}
            };
            spyOn(router, 'go');
            let invalidForm = formService.hasInvalidChildForms(router, formSteps);

            expect(invalidForm).not.toBeDefined();
            expect(router.go).not.toHaveBeenCalled();
        });
    });
});
