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
