/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {EMPLOYEE_PROFILE_STATUSES} from '../../core/constants/constants';
import {fakeModal} from '../../../../test/helpers/modal.js';
import location from '../../core/resources/location/fixtures/location_1.json!json';
import LocationModal from './modal-location.js';

describe('ModalLocation', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, ModalModel, LocationModel,
            component = '<modal-location></modal-location>';

        beforeEach(inject((_$compile_, _$rootScope_, _ModalModel_, _LocationModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            ModalModel = _ModalModel_;
            LocationModel = _LocationModel_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have `modal-location` component', () => {
            element = render();

            expect(element.controller('modalLocation')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        describe('Show title', () => {
            it('should have `Edit Location` modal title defined when location ID exist', () => {
                spyOn(LocationModel, 'getItem').and.returnValue(location);
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Edit Location');
            });

            it('should have `Add Location` modal title defined when location ID does not exist', () => {
                spyOn(LocationModel, 'getItem').and.returnValue({});
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Add Location');
            });
        });

        describe('Close modal', () => {
            it('should have `×` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.close')).text()).toEqual('×');
            });

            it('should close the Location modal when `×` button is clicked', () => {
                element = render();
                spyOn(element.isolateScope().vm, 'cancel');

                angular.element(element[0].querySelector('button.close')).triggerHandler('click');

                expect(element.isolateScope().vm.cancel).toHaveBeenCalled();
            });

            it('should have `Close` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.btn-white')).text()).toEqual('Close');
            });

            it('should close the Location modal when `Close` button is clicked', () => {
                element = render();
                spyOn(element.isolateScope().vm, 'cancel');

                angular.element(element[0].querySelector('button.btn-white')).triggerHandler('click');

                expect(element.isolateScope().vm.cancel).toHaveBeenCalled();
            });
        });

        describe('Submit form', () => {
            it('should call `vm.save` when submit is clicked', function () {
                element = render();
                spyOn(element.isolateScope().vm, 'save');

                const nameInputField = angular.element(element[0].querySelector('input[name="name"][type="text"]'));
                nameInputField.val(location.name);
                nameInputField.triggerHandler('input');

                const statusSelectField = angular.element(element[0].querySelector('select[name="status"]'));
                expect(statusSelectField[0]).toBeDefined();
                statusSelectField.val(location.status);
                statusSelectField.triggerHandler('select');

                element.isolateScope().locationForm.default.$setViewValue(location.default);

                angular.element(element[0].querySelector('button.btn-success')).triggerHandler('click');

                expect(element.isolateScope().locationForm).toBeDefined();
                expect(element.isolateScope().vm.save).toHaveBeenCalledWith(element.isolateScope().locationForm);
                expect(element.isolateScope().vm.location.name).toEqual(location.name);
                expect(element.isolateScope().vm.location.status).toEqual(location.status);
                expect(element.isolateScope().vm.location.default).toEqual(location.default);
                expect(element.isolateScope().locationForm.$valid).toEqual(true);
            });

            it('should have `jp-ng-bs-animated-button` component defined with attributes `is-submitting`, `result` and `options`', () => {
                element = render();
                const saveButton = angular.element(element[0].querySelector('button.btn-success'));

                expect(saveButton[0]).toBeDefined();
                expect(saveButton.attr('is-submitting')).toEqual('vm.isSubmitting');
                expect(saveButton.attr('result')).toEqual('vm.result');
                expect(saveButton.attr('options')).toEqual('vm.saveButtonOptions');
            });
        });

        describe('Form fields', () => {
            const CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg';

            describe('name', () => {
                it('should have `Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="name"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Name');
                });

                it('should show `name` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().locationForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `name` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="name"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().locationForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('status', () => {
                it('should have `Status` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('select[name="status"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Status');
                });

                it('should show statuses dropdown options', () => {
                    element = render();

                    const options = Array.from(angular.element(element[0].querySelectorAll('select[name="status"] > option')));

                    element.isolateScope().vm.statusTypes.forEach((status, index) => {
                        // verify option label
                        expect(angular.element(options[index]).text()).toEqual(status);

                        // verify option key
                        expect(angular.element(options[index]).attr('value')).toEqual('string:' + status);
                    });
                });

                it('should show status field when location is not default location', () => {
                    spyOn(LocationModel, 'getItem').and.returnValue({id: 'id'});
                    element = render();

                    const parentElement = angular.element(element[0].querySelector('select[name="status"]')).parent().parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(false);
                });

                it('should hide status field when location is default location', () => {
                    spyOn(LocationModel, 'getItem').and.returnValue(location);
                    element = render();

                    const parentElement = angular.element(element[0].querySelector('select[name="status"]')).parent().parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(true);
                });
            });

            describe('default', () => {
                it('should have `Default Location` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="default"][type="checkbox"]')).parent().parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Default Location');
                });

                it('should show default field when location is not default location', () => {
                    spyOn(LocationModel, 'getItem').and.returnValue({id: 'id'});
                    element = render();

                    const parentElement = angular.element(element[0].querySelector('input[name="default"][type="checkbox"]')).parent().parent().parent().parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(false);
                });

                it('should hide default field when location is default location', () => {
                    spyOn(LocationModel, 'getItem').and.returnValue(location);
                    element = render();

                    const parentElement = angular.element(element[0].querySelector('input[name="default"][type="checkbox"]')).parent().parent().parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(true);
                });
            });
        });
    });

    describe('Controller', () => {
        let locationModal, FormService, LocationModel, ModalModel, itemMock = {value: 'itemMock'};

        beforeEach(inject((_FormService_, _LocationModel_, _ModalModel_) => {
            ModalModel = _ModalModel_;
            FormService = _FormService_;
            LocationModel = _LocationModel_;
        }));

        it('should have modal property', () => {
            spyOn(ModalModel, 'getItem').and.returnValue(itemMock);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.modal).toEqual(itemMock);
            expect(ModalModel.getItem).toHaveBeenCalled();
        });

        it('should have location property', () => {
            let clonedObject = Object.assign({}, itemMock);
            clonedObject.status = EMPLOYEE_PROFILE_STATUSES.INACTIVE;
            clonedObject.default = true;
            spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.location).toEqual(clonedObject);
            expect(LocationModel.getItem).toHaveBeenCalled();
        });

        it(`should have location.status set to ${EMPLOYEE_PROFILE_STATUSES.ACTIVE} if location.status is undefined`, () => {
            let clonedObject = Object.assign({}, itemMock);
            spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.location.status).toEqual(EMPLOYEE_PROFILE_STATUSES.ACTIVE);
        });

        it(`should have location.default set to false if location.default is undefined`, () => {
            let clonedObject = Object.assign({}, itemMock);
            spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.location.default).toEqual(false);
        });

        it('should have statusTypes property', () => {
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.statusTypes).toEqual([EMPLOYEE_PROFILE_STATUSES.ACTIVE, EMPLOYEE_PROFILE_STATUSES.INACTIVE]);
        });

        it('should have displayDefaultOptions property set to undefined for add modal when location.id does not exist', () => {
            let clonedObject = Object.assign({default: false}, itemMock);
            spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.displayDefaultOptions).toBeUndefined();
        });

        it('should have displayDefaultOptions property set to true for edit modal when location.id exist and location.default is set to false', () => {
            let clonedObject = Object.assign({id: 'id', default: false}, itemMock);
            spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.displayDefaultOptions).toEqual(true);
        });

        it('should have displayDefaultOptions property set to false for edit modal when location.id exist and location.default is set to true', () => {
            let clonedObject = Object.assign({id: 'id', default: true}, itemMock);
            spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.displayDefaultOptions).toEqual(false);
        });

        it('should have isSubmitting property', () => {
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            expect(locationModal.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            locationModal = new LocationModal(ModalModel, LocationModel, FormService);

            locationModal.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        describe('save', () => {
            it('should not save if form is invalid', () => {
                let form = {$valid: false};
                spyOn(FormService, 'save');
                locationModal = new LocationModal(ModalModel, LocationModel, FormService);

                locationModal.save(form);

                expect(locationModal.isSubmitting).toEqual(null);
                expect(FormService.save).not.toHaveBeenCalled();
            });

            describe('when displayDefaultOptions and location.default are set to true', () => {
                it('should set defaultLocation to false', () => {
                    let clonedObject = Object.assign({id: 'id', default: false}, itemMock), form = {$valid: true}, defaultLocation = {default: true};
                    spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
                    spyOn(LocationModel, 'getDefaultLocation').and.returnValue(defaultLocation);

                    locationModal = new LocationModal(ModalModel, LocationModel, FormService);
                    locationModal.location.default = true;
                    locationModal.save(form);

                    expect(defaultLocation.default).toEqual(false);
                    expect(LocationModel.getDefaultLocation).toHaveBeenCalled();
                });

                it(`should set location.status to ${EMPLOYEE_PROFILE_STATUSES.ACTIVE}`, () => {
                    let clonedObject = Object.assign({id: 'id', default: false, status: EMPLOYEE_PROFILE_STATUSES.INACTIVE}, itemMock), defaultLocation = {default: true}, form = {$valid: true};
                    spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
                    spyOn(LocationModel, 'getDefaultLocation').and.returnValue(defaultLocation);

                    locationModal = new LocationModal(ModalModel, LocationModel, FormService);
                    locationModal.location.default = true;
                    locationModal.save(form);

                    expect(locationModal.location.status).toEqual(EMPLOYEE_PROFILE_STATUSES.ACTIVE);
                });

                itAsync(`should save data successfully`, () => {
                    let clonedObject = Object.assign({id: 'id', default: false, status: EMPLOYEE_PROFILE_STATUSES.INACTIVE}, itemMock), defaultLocation = {default: true}, form = {$valid: true};
                    spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
                    spyOn(LocationModel, 'getDefaultLocation').and.returnValue(defaultLocation);
                    spyOn(LocationModel, 'save').and.returnValue(Promise.resolve());
                    spyOn(FormService, 'save');

                    locationModal = new LocationModal(ModalModel, LocationModel, FormService);
                    locationModal.location.default = true;

                    return locationModal.save(form).then(() => {
                        expect(locationModal.isSubmitting).toEqual(true);
                        expect(LocationModel.save).toHaveBeenCalledWith(locationModal.location);
                        expect(FormService.save).toHaveBeenCalledWith(LocationModel, defaultLocation, locationModal, form);
                    });
                });

                itAsync(`should not save data and return failure`, () => {
                    let clonedObject = Object.assign({id: 'id', default: false, status: EMPLOYEE_PROFILE_STATUSES.INACTIVE}, itemMock), defaultLocation = {default: true}, form = {$valid: true}, response = {status: 404};
                    spyOn(LocationModel, 'getItem').and.returnValue(clonedObject);
                    spyOn(LocationModel, 'getDefaultLocation').and.returnValue(defaultLocation);
                    spyOn(LocationModel, 'save').and.returnValue(Promise.reject(response));
                    spyOn(FormService, 'onFailure');

                    locationModal = new LocationModal(ModalModel, LocationModel, FormService);
                    locationModal.location.default = true;

                    return locationModal.save(form).then(() => {
                        expect(FormService.onFailure).toHaveBeenCalledWith(locationModal, response);
                    });
                });
            });

            describe('when displayDefaultOptions is set to false', () => {
                it('should save if form is valid', () => {
                    let form = {$valid: true};
                    spyOn(FormService, 'save');

                    locationModal = new LocationModal(ModalModel, LocationModel, FormService);

                    locationModal.save(form);

                    expect(locationModal.isSubmitting).toEqual(true);
                    expect(FormService.save).toHaveBeenCalledWith(LocationModel, locationModal.location, locationModal, form);
                });

                it('should set default location to true if LocationModel.getCollection.length is equal to 0', () => {
                    let form = {$valid: true};
                    spyOn(FormService, 'save');
                    spyOn(LocationModel, 'getCollection').and.returnValue([]);

                    locationModal = new LocationModal(ModalModel, LocationModel, FormService);
                    locationModal.location.default = false;

                    locationModal.save(form);

                    expect(locationModal.location.default ).toEqual(true);
                    expect(LocationModel.getCollection).toHaveBeenCalled();
                });

                it('should not set default location to true if LocationModel.getCollection.length is more than 0', () => {
                    let form = {$valid: true};
                    spyOn(FormService, 'save');
                    spyOn(LocationModel, 'getCollection').and.returnValue(['1']);

                    locationModal = new LocationModal(ModalModel, LocationModel, FormService);
                    locationModal.location.default = false;

                    locationModal.save(form);

                    expect(locationModal.location.default ).toEqual(false);
                    expect(LocationModel.getCollection).toHaveBeenCalled();
                });
            });
        });
    });
});
