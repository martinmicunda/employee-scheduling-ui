/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from '../../../../core/resources/employee/fixtures/employee_1.json!json';
import ContactDetails from './contact-details.js';

describe('ContactDetails', () => {
    let component = '<contact-details></contact-details>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/account/contact-details',
            state = 'app.account.contact-details',
            currentState,
            $state, $injector;

        beforeEach(inject(( _$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `contact-details`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });
    });

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element;

        beforeEach(inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should contain contact-details component', () => {
            element = render();

            expect(element.controller('contactDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `Contact Details` title defined', () => {
            element = render();
            const title = element.find('h4');

            expect(title.text()).toEqual('Contact Details');
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        it('should have `mm-modal-warning-unsaved-form` component defined', () => {
            element = render();

            expect(element.find('form').attr('mm-modal-warning-unsaved-form')).toBeDefined();
        });

        describe('Form fields', () => {
            const CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg';

            describe('phoneNumber', () => {
                it('should have `Phone Number` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Phone Number');
                });

                it('should show `phoneNumber` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().contactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('address', () => {
                it('should have `Address` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="address"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Address');
                });

                it('should show `address` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="address"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().contactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="address"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('city', () => {
                it('should have `City` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="city"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('City');
                });

                it('should show `city` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="city"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().contactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="city"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('zipCode', () => {
                it('should have `Zip Code` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="zipCode"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Zip Code');
                });

                it('should show `zipCode` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="zipCode"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().contactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="zipCode"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });
        });

        it('should submit the form', function () {
            element = render();

            const phoneNumberInputField = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]'));
            phoneNumberInputField.val(employee.phoneNumber);
            phoneNumberInputField.triggerHandler('input');

            const addressInputField = angular.element(element[0].querySelector('input[name="address"][type="text"]'));
            addressInputField.val(employee.address);
            addressInputField.triggerHandler('input');

            const cityInputField = angular.element(element[0].querySelector('input[name="city"][type="text"]'));
            cityInputField.val(employee.city);
            cityInputField.triggerHandler('input');

            const zipCodeInputField = angular.element(element[0].querySelector('input[name="zipCode"][type="text"]'));
            zipCodeInputField.val(employee.zipCode);
            zipCodeInputField.triggerHandler('input');

            expect(element.isolateScope().contactDetailsForm).toBeDefined();
            expect(element.isolateScope().vm.employee.phoneNumber).toEqual(employee.phoneNumber);
            expect(element.isolateScope().vm.employee.address).toEqual(employee.address);
            expect(element.isolateScope().vm.employee.city).toEqual(employee.city);
            expect(element.isolateScope().vm.employee.zipCode).toEqual(employee.zipCode);
            expect(element.isolateScope().contactDetailsForm.$valid).toEqual(true);
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

    describe('Controller', () => {
        let contactDetails, FormService, EmployeeModel, EmployeeResource, itemMock = {item: 'itemMock'};

        beforeEach(inject((_FormService_, _EmployeeModel_, _EmployeeResource_) => {
            FormService = _FormService_;
            EmployeeModel = _EmployeeModel_;
            EmployeeResource = _EmployeeResource_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            expect(contactDetails.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            expect(contactDetails.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            expect(contactDetails.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(itemMock);
            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            expect(contactDetails.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should calculate profile completeness when controller is loaded', () => {
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            contactDetails.save(form);

            expect(contactDetails.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true, $setPristine: () => {}}, item = {cas: 'newCas'};
            spyOn(EmployeeResource, 'updateAccountDetails').and.returnValue(Promise.resolve(item));
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            spyOn(FormService, 'onSuccess');
            spyOn(form, '$setPristine');

            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            return contactDetails.save(form).then(() => {
                expect(EmployeeResource.updateAccountDetails).toHaveBeenCalledWith(contactDetails.employee);
                expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();
                expect(contactDetails.employee.cas).toEqual(item.cas);
                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onSuccess).toHaveBeenCalled();
            });
        });

        itAsync('should not save if there is failure', () => {
            let form = {$valid: true, $setPristine: () => {}};
            spyOn(EmployeeResource, 'updateAccountDetails').and.returnValue(Promise.reject('error'));
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onFailure');

            contactDetails = new ContactDetails(EmployeeModel, FormService, EmployeeResource);

            return contactDetails.save(form).then(() => {
                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onFailure).toHaveBeenCalledWith(contactDetails, 'error');
            });
        });
    });
});
