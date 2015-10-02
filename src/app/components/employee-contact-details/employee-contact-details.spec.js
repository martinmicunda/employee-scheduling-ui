/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from '../../core/resources/employee/fixtures/employee_1.json!json';
import EmployeeContactDetails from './employee-contact-details.js';

describe('EmployeeContactDetails', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, EmployeeModel,
            component = '<employee-contact-details></employee-contact-details>';

        beforeEach(inject((_$compile_, _$rootScope_, _EmployeeModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            EmployeeModel = _EmployeeModel_;

            spyOn(EmployeeModel, 'getItem').and.returnValue(Object.assign({},employee));

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have `employee-contact-details` component', () => {
            element = render();

            expect(element.controller('employeeContactDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `Contact Details` title defined', () => {
            element = render();
            const title = element.find('legend');

            expect(title.text()).toEqual('Contact Details');
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
                    element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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
                    element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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
                    element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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
                    element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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

            expect(element.isolateScope().employeeContactDetailsForm).toBeDefined();
            expect(element.isolateScope().vm.employee.phoneNumber).toEqual(employee.phoneNumber);
            expect(element.isolateScope().vm.employee.address).toEqual(employee.address);
            expect(element.isolateScope().vm.employee.city).toEqual(employee.city);
            expect(element.isolateScope().vm.employee.zipCode).toEqual(employee.zipCode);
            expect(element.isolateScope().employeeContactDetailsForm.$valid).toEqual(true);
        });
    });

    describe('Controller', () => {
        let employeeContactDetails, EmployeeModel, itemMock = {currencyCode: 'currencyCodeMock', currencySymbol: 'currencySymbolMock'};

        beforeEach(inject((_EmployeeModel_) => {
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

            employeeContactDetails = new EmployeeContactDetails(EmployeeModel);

            expect(employeeContactDetails.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });
    });
});
