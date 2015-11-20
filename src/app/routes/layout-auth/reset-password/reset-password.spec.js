/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import ResetPassword from './reset-password.js';

describe('ResetPassword', () => {
    let component = '<reset-password></reset-password>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let token = '1',
            url = `/reset-password/${token}`,
            state = 'auth.reset-password',
            currentState,
            $state, $injector;

        beforeEach(inject(( _$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            $state.go(state, {token: token});
            currentState = $state.get(state);
        }));

        it('should have component named `reset-password`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {token: token})).toEqual(url);
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

        it('should contain reset password component', () => {
            element = render();

            expect(element.controller('resetPassword')).toBeDefined();
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
    });

    describe('Controller', () => {
        let resetPassword, $state, $timeout, $rootScope, FormService, TokenModel, AuthenticationResource,
            itemMock = {id: 'id'};

        beforeEach(inject((_$state_, _$rootScope_, _$timeout_, _FormService_, _TokenModel_, _AuthenticationResource_) => {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            FormService = _FormService_;
            TokenModel = _TokenModel_;
            AuthenticationResource = _AuthenticationResource_;
            $state.params.token = 'token';
        }));

        it('should have copyrightDate property', () => {
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(resetPassword.copyrightDate.getFullYear()).toEqual(new Date().getFullYear());
        });

        it('should have isSubmitting property', () => {
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(resetPassword.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(resetPassword.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue({});
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
            expect(resetPassword.saveButtonOptions.buttonDefaultText).toEqual('Set a New Password');
            expect(resetPassword.saveButtonOptions.buttonSubmittingText).toEqual('Setting a New Password');
            expect(resetPassword.saveButtonOptions.buttonSuccessText).toEqual('Set a New Password');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            resetPassword.resetPassword(form.$valid, form);

            expect(resetPassword.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true, $setPristine: () => {}};
            spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.resolve());
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);
            resetPassword.password = 'password';

            resetPassword.resetPassword(form.$valid, form);

            expect(resetPassword.isSubmitting).toEqual(true);
            expect(AuthenticationResource.resetPassword).toHaveBeenCalledWith({password: resetPassword.password}, $state.params.token);
        });

        itAsync('should save form with successfully request', () => {
            let form = {$valid: true, $setPristine: () => {}}, respond = {token: 'token'};
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onSuccess');
            spyOn($state, 'go');
            spyOn(TokenModel, 'set');
            spyOn(TokenModel, 'getCurrentUser').and.returnValue(itemMock);
            spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.resolve(respond));
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);
            resetPassword.password = 'password';

            return resetPassword.resetPassword(form.$valid, form).then(() => {
                expect(TokenModel.set).toHaveBeenCalledWith(respond.token);
                expect(TokenModel.getCurrentUser).toHaveBeenCalled();
                expect(resetPassword.$rootScope.currentUser).toEqual(itemMock);
                expect(FormService.onSuccess).toHaveBeenCalledWith(resetPassword);
                expect(form.$setPristine).toHaveBeenCalled();
                expect(resetPassword.hasSuccess).toEqual(true);
                expect(resetPassword.successMessage).toEqual('Your password has been changed, and you have been logged into your account. You will be redirected back to the site in 5 seconds.');
                $timeout.flush();
                expect($state.go).toHaveBeenCalledWith('app.schedule');
            });
        });

        itAsync('should not save form with failure request', () => {
            let form = {$valid: true, $setPristine: () => {}}, response = {status: 500};
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onFailure');
            spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.reject(response));
            resetPassword = new ResetPassword($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);
            resetPassword.password = 'password';

            return resetPassword.resetPassword(form.$valid, form).then(() => {
                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onFailure).toHaveBeenCalledWith(resetPassword, response);
                expect(resetPassword.hasSuccess).toEqual(false);
            });
        });
    });
});
