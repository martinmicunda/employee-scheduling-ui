/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import ActivateAccount from './activate-account.js';

describe('ActivateAccount', () => {
    let component = '<activate-account></activate-account>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let token = '1',
            url = `/activate/${token}`,
            state = 'auth.activate-account',
            currentState,
            $state, $injector;

        beforeEach(inject(( _$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            $state.go(state, {token: token});
            currentState = $state.get(state);
        }));

        it('should have component named `activate-account`', () => {
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

        it('should contain activate account component', () => {
            element = render();

            expect(element.controller('activateAccount')).toBeDefined();
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
        let activateAccount, $state, $timeout, $rootScope, FormService, TokenModel, AuthenticationResource,
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
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(activateAccount.copyrightDate.getFullYear()).toEqual(new Date().getFullYear());
        });

        it('should have isSubmitting property', () => {
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(activateAccount.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(activateAccount.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue({});
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
            expect(activateAccount.saveButtonOptions.buttonDefaultText).toEqual('Activate your Account');
            expect(activateAccount.saveButtonOptions.buttonSubmittingText).toEqual('Activating your Account');
            expect(activateAccount.saveButtonOptions.buttonSuccessText).toEqual('Activated your Account');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);

            activateAccount.activateAccount(form.$valid, form);

            expect(activateAccount.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true, $setPristine: () => {}};
            spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.resolve());
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);
            activateAccount.password = 'password';

            activateAccount.activateAccount(form.$valid, form);

            expect(activateAccount.isSubmitting).toEqual(true);
            expect(AuthenticationResource.resetPassword).toHaveBeenCalledWith({password: activateAccount.password}, $state.params.token);
        });

        itAsync('should save form with successfully request', () => {
            let form = {$valid: true, $setPristine: () => {}}, respond = {token: 'token'};
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onSuccess');
            spyOn($state, 'go');
            spyOn(TokenModel, 'set');
            spyOn(TokenModel, 'getCurrentUser').and.returnValue(itemMock);
            spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.resolve(respond));
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);
            activateAccount.password = 'password';

            return activateAccount.activateAccount(form.$valid, form).then(() => {
                expect(TokenModel.set).toHaveBeenCalledWith(respond.token);
                expect(TokenModel.getCurrentUser).toHaveBeenCalled();
                expect(activateAccount.$rootScope.currentUser).toEqual(itemMock);
                expect(FormService.onSuccess).toHaveBeenCalledWith(activateAccount);
                expect(form.$setPristine).toHaveBeenCalled();
                expect(activateAccount.hasSuccess).toEqual(true);
                expect(activateAccount.successMessage).toEqual('Your account has been activated, and you have been logged into your account. You will be redirected back to the site in 5 seconds.');
                $timeout.flush();
                expect($state.go).toHaveBeenCalledWith('app.schedule');
            });
        });

        itAsync('should not save form with failure request', () => {
            let form = {$valid: true, $setPristine: () => {}}, response = {status: 500};
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onFailure');
            spyOn(AuthenticationResource, 'resetPassword').and.returnValue(Promise.reject(response));
            activateAccount = new ActivateAccount($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel);
            activateAccount.password = 'password';

            return activateAccount.activateAccount(form.$valid, form).then(() => {
                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onFailure).toHaveBeenCalledWith(activateAccount, response);
                expect(activateAccount.hasSuccess).toEqual(false);
            });
        });
    });
});
