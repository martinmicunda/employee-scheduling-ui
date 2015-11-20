/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import ForgotPassword from './forgot-password.js';

describe('ForgotPassword', () => {
    let component = '<forgot-password></forgot-password>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/forgot-password',
            state = 'auth.forgot-password',
            currentState,
            $state, $injector;

        beforeEach(inject(( _$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `forgot-password`', () => {
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

        it('should contain forgot-password component', () => {
            element = render();

            expect(element.controller('forgotPassword')).toBeDefined();
            expect(element['0']).not.toEqual(component);
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

        describe('Submit form', () => {
            it('should call `vm.resetPassword` when submit is clicked', function () {
                const credentials = {email: 'test@test.com'};
                element = render();
                spyOn(element.isolateScope().vm, 'resetPassword');

                const emailInputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                emailInputField.val(credentials.email);
                emailInputField.triggerHandler('input');

                element.find('form').triggerHandler('submit');

                expect(element.isolateScope().passwordResetForm).toBeDefined();
                expect(element.isolateScope().vm.resetPassword).toHaveBeenCalledWith(element.isolateScope().passwordResetForm.$valid, element.isolateScope().passwordResetForm);
                expect(element.isolateScope().vm.email).toEqual(credentials.email);
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

                it('should show `email` required error class', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().passwordResetForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorClass = angular.element(element[0].querySelector('input[name="email"][type="email"]')).parent();

                    expect(errorClass.find('div').hasClass('error-icon')).toEqual(true);
                    expect(errorClass.find('div').hasClass('valid-icon')).toEqual(false);
                });

                it('should show `email` email error class', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('invalid-email');
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().passwordResetForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorClass = angular.element(element[0].querySelector('input[name="email"][type="email"]')).parent();

                    expect(errorClass.find('div').hasClass('error-icon')).toEqual(true);
                    expect(errorClass.find('div').hasClass('valid-icon')).toEqual(false);
                });
            });
        });

        describe('Link', () => {
            it('should contain Back to Login label', () => {
                element = render();
                const nav = angular.element(element[0].querySelector('.link a'));

                expect(nav.text().trim()).toEqual('Back to Login');
            });

            it('should redirect to login page', () => {
                element = render();
                const nav = angular.element(element[0].querySelector('.link a'));

                expect(nav.attr('ui-sref')).toEqual('auth.login');
            });
        });

        it('should contain info text', () => {
            element = render();
            let infoText = angular.element(element[0].querySelector('.info p'));

            expect(infoText.text()).toEqual('Enter your email address that you used to register. We will send you an email with a link to reset your password.');
        });

        it('should contain copyright link', () => {
            element = render();
            let copyrightLink = angular.element(element[0].querySelector('section p.text-muted a'));

            expect(copyrightLink.attr('href')).toEqual('http://www.martinmicunda.com');
            expect(copyrightLink.attr('target')).toEqual('_blank');
        });

        it('should contain copyright text', () => {
            element = render();
            let copyrightYear = new Date().getFullYear();
            let copyrightText = angular.element(element[0].querySelector('section p.text-muted'));

            expect(element.isolateScope().vm.copyrightDate.getFullYear()).toEqual(copyrightYear);
            expect(copyrightText.text().trim()).toEqual(`Copyright © ${copyrightYear.toString()} Martin Micunda. All rights reserved.`);
        });
    });

    describe('Controller', () => {
        let forgotPassword, AuthenticationResource, FormService;

        beforeEach(inject((_AuthenticationResource_, _FormService_) => {
            AuthenticationResource = _AuthenticationResource_;
            FormService = _FormService_;
        }));

        it('should have isSubmitting property', () => {
            forgotPassword = new ForgotPassword(AuthenticationResource, FormService);

            expect(forgotPassword.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            forgotPassword = new ForgotPassword(AuthenticationResource, FormService);

            expect(forgotPassword.result).toEqual(null);
        });

        it('should have copyrightDate property', () => {
            forgotPassword = new ForgotPassword(AuthenticationResource, FormService);

            expect(forgotPassword.copyrightDate.getFullYear()).toEqual(new Date().getFullYear());
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue({});
            forgotPassword = new ForgotPassword(AuthenticationResource, FormService);

            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
            expect(forgotPassword.saveButtonOptions.buttonDefaultText).toEqual('Reset password');
            expect(forgotPassword.saveButtonOptions.buttonSuccessText).toEqual('Reset password');
            expect(forgotPassword.saveButtonOptions.buttonSubmittingText).toEqual('Resetting password');
        });

        describe('resetPassword()', () => {
            it('should not reset password if form is invalid', () => {
                let isFormValid = false;
                spyOn(AuthenticationResource, 'forgotPassword');
                forgotPassword = new ForgotPassword(AuthenticationResource, FormService);

                forgotPassword.resetPassword(isFormValid);

                expect(forgotPassword.isSubmitting).toEqual(null);
                expect(AuthenticationResource.forgotPassword).not.toHaveBeenCalled();
            });

            it('should save if form is valid', () => {
                let form = {$valid: true, $setPristine: () => {}};
                spyOn(AuthenticationResource, 'forgotPassword').and.returnValue(Promise.resolve());
                forgotPassword = new ForgotPassword(AuthenticationResource, FormService);
                forgotPassword.email = 'email';

                forgotPassword.resetPassword(form.$valid, form);

                expect(forgotPassword.isSubmitting).toEqual(true);
                expect(AuthenticationResource.forgotPassword).toHaveBeenCalledWith(forgotPassword.email);
            });

            itAsync('should save form with successfully request', () => {
                let form = {$valid: true, $setPristine: () => {}};
                spyOn(form, '$setPristine');
                spyOn(FormService, 'onSuccess');
                spyOn(AuthenticationResource, 'forgotPassword').and.returnValue(Promise.resolve());
                forgotPassword = new ForgotPassword(AuthenticationResource, FormService);
                forgotPassword.email = 'email';

                return forgotPassword.resetPassword(form.$valid, form).then(() => {
                    expect(FormService.onSuccess).toHaveBeenCalledWith(forgotPassword);
                    expect(forgotPassword.email).toEqual('');
                    expect(form.$setPristine).toHaveBeenCalled();
                    expect(forgotPassword.hasSuccess).toEqual(true);
                    expect(forgotPassword.successMessage).toEqual('We have emailed you instructions on how to reset your password. Please check your inbox.');
                });
            });

            itAsync('should not save form with failure request', () => {
                let form = {$valid: true, $setPristine: () => {}}, response = {status: 500};
                spyOn(form, '$setPristine');
                spyOn(FormService, 'onFailure');
                spyOn(AuthenticationResource, 'forgotPassword').and.returnValue(Promise.reject(response));
                forgotPassword = new ForgotPassword(AuthenticationResource, FormService);

                return forgotPassword.resetPassword(form.$valid, form).then(() => {
                    expect(form.$setPristine).toHaveBeenCalled();
                    expect(forgotPassword.hasSuccess).toEqual(false);
                    expect(FormService.onFailure).toHaveBeenCalledWith(forgotPassword, response);
                });
            });

            itAsync('should not save form with 404 failure request', () => {
                let form = {$valid: true, $setPristine: () => {}}, response = {status: 404};
                spyOn(form, '$setPristine');
                spyOn(FormService, 'onFailure');
                spyOn(AuthenticationResource, 'forgotPassword').and.returnValue(Promise.reject(response));
                forgotPassword = new ForgotPassword(AuthenticationResource, FormService);

                return forgotPassword.resetPassword(form.$valid, form).then(() => {
                    expect(forgotPassword.errorMessage).toEqual('This email address was not found in our records');
                });
            });
        });
    });
});
