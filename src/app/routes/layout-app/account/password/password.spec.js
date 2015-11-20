/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Password from './password.js';

describe('Password', () => {
    let component = '<password-details></password-details>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/account/password',
            state = 'app.account.password',
            currentState,
            $state, $injector;

        beforeEach(inject(( _$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `password-details`', () => {
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

        it('should contain password component', () => {
            element = render();

            expect(element.controller('passwordDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `Password` title defined', () => {
            element = render();
            const title = element.find('h4');

            expect(title.text()).toEqual('Password');
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        it('should have `alert-success` component defined with attributes `success-message` and `has-success`', () => {
            element = render();

            expect(element.find('alert-success')[0]).toBeDefined();
            expect(element.find('alert-success').attr('success-message')).toEqual('vm.successMessage');
            expect(element.find('alert-success').attr('has-success')).toEqual('vm.hasSuccess');
        });

        describe('Form fields', () => {
            const CHARACTERS_21 = 'ojpaxxoltpgweudmogmvp';

            describe('currentPassword', () => {
                it('should have `Current Password` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="currentPassword"][type="password"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Current Password');
                });

                it('should show `currentPassword` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().passwordForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="currentPassword"][type="password"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `currentPassword` minlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="currentPassword"][type="password"]'));
                    inputField.val('123');
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().passwordForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="currentPassword"][type="password"] ~ div > div[ng-message="minlength"]'));

                    expect(errorMessage.text()).toEqual('Your password must be at least 6 characters long.');
                });
            });

            describe('password', () => {
                it('should have `New Password` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="password"][type="password"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('New Password');
                });

                it('should show `password` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().passwordForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="password"][type="password"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `password` minlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="password"][type="password"]'));
                    inputField.val('123');
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().passwordForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="password"][type="password"] ~ div > div[ng-message="minlength"]'));

                    expect(errorMessage.text()).toEqual('Your password must be at least 6 characters long.');
                });

                it('should show `password` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="password"][type="password"]'));
                    inputField.val(CHARACTERS_21);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().passwordForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="password"][type="password"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('Your password must be max 20 characters long.');
                });
            });

            describe('confirmPassword', () => {
                it('should have `Confirm Password` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="confirmPassword"][type="password"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Confirm Password');
                });

                it('should show `confirmPassword` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().passwordForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="confirmPassword"][type="password"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `confirmPassword` equal error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="password"][type="password"]'));
                    inputField.val('123456');
                    inputField.triggerHandler('input');
                    const inputField1 = angular.element(element[0].querySelector('input[name="confirmPassword"][type="password"]'));
                    inputField1.val('1234567');
                    inputField1.triggerHandler('input');

                    element.triggerHandler('submit');
                    element.isolateScope().passwordForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="confirmPassword"][type="password"] ~ div > div[ng-message="equal"]'));

                    expect(errorMessage.text()).toEqual('Passwords do not match.');
                });
            });
        });

        it('should submit the form', function () {
            const passwords = {currentPassword: 'currentPassword', password: 'password', confirmPassword: 'password'};
            element = render();

            const currentPasswordInputField = angular.element(element[0].querySelector('input[name="currentPassword"][type="password"]'));
            currentPasswordInputField.val(passwords.currentPassword);
            currentPasswordInputField.triggerHandler('input');

            const passwordInputField = angular.element(element[0].querySelector('input[name="password"][type="password"]'));
            passwordInputField.val(passwords.password);
            passwordInputField.triggerHandler('input');

            const confirmPasswordInputField = angular.element(element[0].querySelector('input[name="confirmPassword"][type="password"]'));
            confirmPasswordInputField.val(passwords.confirmPassword);
            confirmPasswordInputField.triggerHandler('input');

            expect(element.isolateScope().passwordForm).toBeDefined();
            expect(element.isolateScope().vm.passwords.currentPassword).toEqual(passwords.currentPassword);
            expect(element.isolateScope().vm.passwords.password).toEqual(passwords.password);
            expect(element.isolateScope().vm.passwords.confirmPassword).toEqual(passwords.confirmPassword);
            expect(element.isolateScope().passwordForm.$valid).toEqual(true);
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
        let password, FormService, EmployeeModel, AuthenticationResource,
            itemMock = {id: 'id'};

        beforeEach(inject((_FormService_, _EmployeeModel_, _AuthenticationResource_) => {
            FormService = _FormService_;
            EmployeeModel = _EmployeeModel_;
            AuthenticationResource = _AuthenticationResource_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            password = new Password(EmployeeModel, FormService, AuthenticationResource);

            expect(password.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            password = new Password(EmployeeModel, FormService, AuthenticationResource);

            expect(password.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            password = new Password(EmployeeModel, FormService, AuthenticationResource);

            expect(password.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            password = new Password(EmployeeModel, FormService, AuthenticationResource);

            expect(password.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it('should calculate profile completeness when controller is loaded', () => {
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            password = new Password(EmployeeModel, FormService, AuthenticationResource);

            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            password = new Password(EmployeeModel, FormService, AuthenticationResource);

            password.save(form);

            expect(password.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true, $setPristine: () => {}};
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(AuthenticationResource, 'updatePassword').and.returnValue(Promise.resolve());
            password = new Password(EmployeeModel, FormService, AuthenticationResource);
            password.passwords = {currentPassword: 'currentPassword'};

            password.save(form);

            expect(password.isSubmitting).toEqual(true);
            expect(AuthenticationResource.updatePassword).toHaveBeenCalledWith(password.passwords, password.employee.id);
        });

        itAsync('should save form with successfully request', () => {
            let form = {$valid: true, $setPristine: () => {}};
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onSuccess');
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(AuthenticationResource, 'updatePassword').and.returnValue(Promise.resolve());
            password = new Password(EmployeeModel, FormService, AuthenticationResource);
            password.passwords = {currentPassword: 'currentPassword'};

            return password.save(form).then(() => {
                expect(password.passwords).toEqual({});
                expect(FormService.onSuccess).toHaveBeenCalledWith(password);
                expect(form.$setPristine).toHaveBeenCalled();
                expect(password.hasSuccess).toEqual(true);
                expect(password.successMessage).toEqual('Your password has been changed successfully.');
            });
        });

        itAsync('should not save form with failure request', () => {
            let form = {$valid: true, $setPristine: () => {}}, response = {status: 500};
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onFailure');
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(AuthenticationResource, 'updatePassword').and.returnValue(Promise.reject(response));
            password = new Password(EmployeeModel, FormService, AuthenticationResource);
            password.passwords = {currentPassword: 'currentPassword'};

            return password.save(form).then(() => {
                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onFailure).toHaveBeenCalledWith(password, response);
                expect(password.hasSuccess).toEqual(false);
            });
        });
    });
});
