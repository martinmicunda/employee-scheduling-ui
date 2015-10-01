/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

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
    });

    describe('Controller', () => {
        let forgotPassword, $state, AuthenticationResource, FormService;

        beforeEach(inject((_$state_, _AuthenticationResource_, _FormService_) => {
            $state = _$state_;
            AuthenticationResource = _AuthenticationResource_;
            FormService = _FormService_;
        }));

        it('should have isSubmitting property', () => {
            forgotPassword = new ForgotPassword($state, AuthenticationResource, FormService);

            expect(forgotPassword.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            forgotPassword = new ForgotPassword($state, AuthenticationResource, FormService);

            expect(forgotPassword.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue({});
            forgotPassword = new ForgotPassword($state, AuthenticationResource, FormService);

            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
            expect(forgotPassword.saveButtonOptions.buttonDefaultText).toEqual('Reset password');
            expect(forgotPassword.saveButtonOptions.buttonSuccessText).toEqual('Reset password');
            expect(forgotPassword.saveButtonOptions.buttonSubmittingText).toEqual('Resetting password');
        });

        describe('resetPassword()', () => {
            it('should not reset password if form is invalid', () => {
                let isFormValid = false;
                spyOn(AuthenticationResource, 'resetPassword');
                forgotPassword = new ForgotPassword($state, AuthenticationResource, FormService);

                forgotPassword.resetPassword(isFormValid);

                expect(forgotPassword.isSubmitting).toEqual(null);
                expect(AuthenticationResource.resetPassword).not.toHaveBeenCalled();
            });

            it('should reset password if form is valid', () => {
                let isFormValid = true, form = {$setPristine: () => {}};
                spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.resolve());

                forgotPassword = new ForgotPassword($state, AuthenticationResource, FormService);
                forgotPassword.credentials = 'credentials';
                forgotPassword.resetPassword(isFormValid, form);

                expect(forgotPassword.isSubmitting).toEqual(true);
                expect(AuthenticationResource.resetPassword).toHaveBeenCalledWith(forgotPassword.credentials);
            });

            itAsync('should reset password and display message', () => {
                let isFormValid = true, form = {$setPristine: () => {}};
                spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.resolve());
                spyOn(form, '$setPristine');

                forgotPassword = new ForgotPassword($state, AuthenticationResource, FormService);
                forgotPassword.credentials = 'credentials';

                return forgotPassword.resetPassword(isFormValid, form).then(() => {
                    expect(forgotPassword.credentials).toEqual({});
                    expect(forgotPassword.result).toEqual('success');
                    expect(forgotPassword.hasSuccess).toEqual(true);
                    expect(forgotPassword.successMessage).toEqual('We have emailed you instructions on how to reset your password.');
                    expect(form.$setPristine).toHaveBeenCalled();
                });
            });
        });
    });
});
