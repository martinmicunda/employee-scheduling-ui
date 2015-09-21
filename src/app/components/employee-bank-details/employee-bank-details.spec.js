/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from '../../core/resources/employee/fixtures/employee_1.json!json';
import EmployeeBankDetails from './employee-bank-details.js';

describe('EmployeeBankDetails', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, EmployeeModel,
            component = '<employee-bank-details></employee-bank-details>';

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

        it('should have `employee-bank-details` component', () => {
            element = render();

            expect(element.controller('employeeBankDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `Bank Details` title defined', () => {
            element = render();
            const title = element.find('legend');

            expect(title.text()).toEqual('Bank Details');
        });

        describe('Form fields', () => {
            const CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg';

            describe('bankName', () => {
                it('should have `Bank Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="bankName"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Bank Name');
                });

                it('should show `bankName` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="bankName"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeContactBankForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="bankName"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('bankAccountName', () => {
                it('should have `Account Number` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="bankAccountName"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Account Number');
                });

                it('should show `bankAccountName` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="bankAccountName"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeContactBankForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="bankAccountName"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('bankAccountNumber', () => {
                it('should have `Account Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="bankAccountNumber"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Account Name');
                });

                it('should show `bankAccountName` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="bankAccountNumber"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeContactBankForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="bankAccountNumber"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });
        });

        it('should submit the form', function () {
            element = render();

            const accountNameInputField = angular.element(element[0].querySelector('input[name="bankAccountNumber"][type="text"]'));
            accountNameInputField.val(employee.bankAccountNumber);
            accountNameInputField.triggerHandler('input');

            const accountNumberInputField = angular.element(element[0].querySelector('input[name="bankAccountName"][type="text"]'));
            accountNumberInputField.val(employee.bankAccountName);
            accountNumberInputField.triggerHandler('input');

            const bankNameInputField = angular.element(element[0].querySelector('input[name="bankName"][type="text"]'));
            bankNameInputField.val(employee.bankName);
            bankNameInputField.triggerHandler('input');

            expect(element.isolateScope().employeeContactBankForm).toBeDefined();
            expect(element.isolateScope().vm.employee.bankName).toEqual(employee.bankName);
            expect(element.isolateScope().vm.employee.bankAccountName).toEqual(employee.bankAccountName);
            expect(element.isolateScope().vm.employee.bankAccountNumber).toEqual(employee.bankAccountNumber);
            expect(element.isolateScope().employeeContactBankForm.$valid).toEqual(true);
        });
    });

    describe('Controller', () => {
        let employeeBankDetails, EmployeeModel, itemMock = {currencyCode: 'currencyCodeMock', currencySymbol: 'currencySymbolMock'};

        beforeEach(inject((_EmployeeModel_) => {
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

            employeeBankDetails = new EmployeeBankDetails(EmployeeModel);

            expect(employeeBankDetails.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });
    });
});
