/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Login from './login.js';

describe('Login', () => {
    let component = '<login></login>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/',
            state = 'auth.login',
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

        it('should contain login component', () => {
            element = render();

            expect(element.controller('login')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        describe('Submit form', () => {
            it('should call `vm.login` when submit is clicked', function () {
                const credentials = {email: 'test@test.com', password: 'pass'};
                element = render();
                spyOn(element.isolateScope().vm, 'login');

                const emailInputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                emailInputField.val(credentials.email);
                emailInputField.triggerHandler('input');

                const passwordInputField = angular.element(element[0].querySelector('input[name="password"][type="password"]'));
                passwordInputField.val(credentials.password);
                passwordInputField.triggerHandler('input');

                element.find('form').triggerHandler('submit');

                expect(element.isolateScope().loginForm).toBeDefined();
                expect(element.isolateScope().vm.login).toHaveBeenCalledWith(element.isolateScope().loginForm.$valid);
                expect(element.isolateScope().vm.credentials.email).toEqual(credentials.email);
                expect(element.isolateScope().vm.credentials.password).toEqual(credentials.password);
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
            describe('email', () => {
                it('should have `Email Address` placeholder defined', () => {
                    element = render();
                    const email = angular.element(element[0].querySelector('input[name="email"][type="email"]'));

                    expect(email.attr('placeholder')).toEqual('Email Address');
                });

                it('should show `email` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().loginForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `email` email error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('invalid-email');
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().loginForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="email"]'));

                    expect(errorMessage.text()).toEqual('Invalid email.');
                });
            });

            describe('password', () => {
                it('should have `Password` placeholder defined', () => {
                    element = render();
                    const email = angular.element(element[0].querySelector('input[name="password"][type="password"]'));

                    expect(email.attr('placeholder')).toEqual('Password');
                });

                it('should show `password` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().loginForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="password"][type="password"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });
            });
        });

        describe('Link', () => {
            it('should contain Forgot password? label', () => {
                element = render();
                const nav = angular.element(element[0].querySelector('label a'));

                expect(nav.text().trim()).toEqual('Forgot password?');
            });

            it('should redirect to forgot password page', () => {
                element = render();
                const nav = angular.element(element[0].querySelector('label a'));

                expect(nav.attr('ui-sref')).toEqual('auth.forgot-password');
            });
        });
    });

    describe('Controller', () => {
        let login, $rootScope, $state, AuthenticationService, FormService;

        beforeEach(inject((_$rootScope_, _$state_, _AuthenticationService_, _FormService_) => {
            $rootScope = _$rootScope_;
            $state = _$state_;
            AuthenticationService = _AuthenticationService_;
            FormService = _FormService_;
        }));

        it('should have isSubmitting property', () => {
            login = new Login($rootScope, $state, AuthenticationService, FormService);

            expect(login.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            login = new Login($rootScope, $state, AuthenticationService, FormService);

            expect(login.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue({});
            login = new Login($rootScope, $state, AuthenticationService, FormService);

            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
            expect(login.saveButtonOptions.buttonDefaultText).toEqual('Sign me in');
            expect(login.saveButtonOptions.buttonSuccessText).toEqual('Signed me in');
            expect(login.saveButtonOptions.buttonSubmittingText).toEqual('Signing me in');
        });

        describe('login()', () => {
            it('should not login if form is invalid', () => {
                let isFormValid = false;
                spyOn(AuthenticationService, 'login');
                login = new Login($rootScope, $state, AuthenticationService, FormService);

                login.login(isFormValid);

                expect(login.isSubmitting).toEqual(null);
                expect(AuthenticationService.login).not.toHaveBeenCalled();
            });

            it('should login if form is valid', () => {
                let isFormValid = true;
                spyOn(AuthenticationService, 'login').and.returnValue(Promise.resolve());

                login = new Login($rootScope, $state, AuthenticationService, FormService);
                login.credentials = 'credentials';
                login.login(isFormValid);

                expect(login.isSubmitting).toEqual(true);
                expect(AuthenticationService.login).toHaveBeenCalledWith(login.credentials);
            });

            itAsync('should login successfully', () => {
                let isFormValid = true;
                spyOn(AuthenticationService, 'login').and.returnValue(Promise.resolve());
                spyOn(AuthenticationService, 'getCurrentUser').and.returnValue('user');
                spyOn(FormService, 'onSuccess');
                spyOn($state, 'go');

                login = new Login($rootScope, $state, AuthenticationService, FormService);

                return login.login(isFormValid).then(() => {
                    expect($rootScope.currentUser).toEqual('user');
                    expect(AuthenticationService.login).toHaveBeenCalledWith(login.credentials);
                    expect(AuthenticationService.getCurrentUser).toHaveBeenCalled();
                    expect(FormService.onSuccess).toHaveBeenCalledWith(login);
                    expect($state.go).toHaveBeenCalledWith('app.schedule');
                });
            });

            itAsync('should not login if there is failure', () => {
                let isFormValid = true;
                spyOn(AuthenticationService, 'login').and.returnValue(Promise.reject('error'));
                spyOn(FormService, 'onFailure');
                spyOn($state, 'go');

                login = new Login($rootScope, $state, AuthenticationService, FormService);

                return login.login(isFormValid).then(() => {
                    expect(FormService.onFailure).toHaveBeenCalledWith(login, 'error');
                    expect($state.go).not.toHaveBeenCalled();
                });
            });
        });
    });
});
