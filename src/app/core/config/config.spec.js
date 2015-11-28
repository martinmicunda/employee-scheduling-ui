/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {ACCESS_LEVELS} from '../constants/constants.js';
import {OnConfig, OnRun} from './config.js';

describe('Config', () => {
    let $urlRouterProvider, $provide, $locationProvider, $httpProvider, $state;

    beforeEach(angular.mock.module('ngDecorator'));

    beforeEach(() => {
        $httpProvider = {
            interceptors: []
        };
        $state = jasmine.createSpyObj('$state', ['go', 'get']);
        $provide = jasmine.createSpyObj('$provide', ['decorator']);
        $locationProvider = jasmine.createSpyObj('$locationProvider', ['html5Mode']);
        $urlRouterProvider = jasmine.createSpyObj('$urlRouterProvider', ['when', 'otherwise']);

        OnConfig.configFactory($locationProvider, $provide, $urlRouterProvider, $httpProvider);
    });

    it('should overwrite the default behaviour for $uiViewScroll service', () => {
        expect($provide.decorator).toHaveBeenCalled();
    });

    it('should add ApiUrlHttpInterceptor to $httpProvider.interceptors', () => {
        expect($httpProvider.interceptors[0]).toEqual('HttpApiUrlInterceptor');
    });

    it('should add HttpAuthenticationInterceptor to $httpProvider.interceptors', () => {
        expect($httpProvider.interceptors[1]).toEqual('HttpAuthenticationInterceptor');
    });

    it('should add HttpRetryInterceptor to $httpProvider.interceptors', () => {
        expect($httpProvider.interceptors[2]).toEqual('HttpRetryInterceptor');
    });

    it('should use the HTML5 History API (set to true)', () => {
        expect($locationProvider.html5Mode).toHaveBeenCalledWith({ enabled: true, requireBase: false });
    });

    it('should redirect to `/404` for any unmatched url route', () => {
        expect($urlRouterProvider.otherwise).toHaveBeenCalledWith('/404');
    });

    it('should redirect to `/schedule` when url match `/home`', () => {
        expect($urlRouterProvider.when).toHaveBeenCalledWith('/home', '/schedule');
    });

    describe('Run', () => {
        let $log, $state, $rootScope, AuthenticationService;

        beforeEach(inject((_$rootScope_, _$state_, _$log_, _AuthenticationService_) => {
            $log = _$log_;
            $state = _$state_;
            $rootScope = _$rootScope_;
            AuthenticationService = _AuthenticationService_;
        }));

        it('should set currentUser to $rootScope', () => {
            spyOn(AuthenticationService, 'getCurrentUser').and.returnValue('currentUser');

            OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

            expect($rootScope.currentUser).toEqual('currentUser');
            expect(AuthenticationService.getCurrentUser).toHaveBeenCalled();
        });

        it('should set ACCESS_LEVELS to $rootScope', () => {
            OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

            expect($rootScope.ACCESS_LEVELS).toEqual(ACCESS_LEVELS);
        });

        describe('$stateChangeStart', () => {
            it('should set `$rootScope.isLoading` to true when route contains resolve property', () => {
                const toState = {resolve: 'test'};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect($rootScope.isLoading).toEqual(true);
            });

            it('should not set `$rootScope.isLoading` when route does not contain resolve property', () => {
                const toState = {};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect($rootScope.isLoading).toBeFalsy();
            });

            it('should catch unauthorised route changes when `data.access` is undefined and redirect to `403`', () => {
                spyOn($state, 'go');
                const toState = {name: 'test'};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                const event = $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect(event.defaultPrevented).toEqual(true);
                expect($state.go).toHaveBeenCalledWith('403');
            });

            it('should catch unauthorised route changes when user is authenticated and redirect to `403`', () => {
                spyOn($state, 'go');
                spyOn(AuthenticationService, 'isAuthorized').and.returnValue(false);
                spyOn(AuthenticationService, 'isAuthenticated').and.returnValue(true);
                const toState = {name: 'test', url: '/', data: {access: 'test'}};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                const event = $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect(event.defaultPrevented).toEqual(true);
                expect($state.go).toHaveBeenCalledWith('403');
                expect(AuthenticationService.isAuthenticated).toHaveBeenCalled();
                expect(AuthenticationService.isAuthorized).toHaveBeenCalledWith('test');
            });

            it('should catch unauthenticated route changes when user is not authenticated and redirect to `login`', () => {
                spyOn($state, 'go');
                spyOn(AuthenticationService, 'isAuthorized').and.returnValue(false);
                spyOn(AuthenticationService, 'isAuthenticated').and.returnValue(false);
                const toState = {name: 'test', url: '/', data: {access: 'test'}};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                const event = $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect(event.defaultPrevented).toEqual(true);
                expect($state.go).toHaveBeenCalledWith('auth.login');
                expect(AuthenticationService.isAuthenticated).toHaveBeenCalled();
                expect(AuthenticationService.isAuthorized).toHaveBeenCalledWith('test');
            });

            it('should not redirect to `login` or `403` when user is unauthenticated and toState name is equal to `auth.login`', () => {
                spyOn($state, 'go');
                spyOn(AuthenticationService, 'isAuthorized').and.returnValue(false);
                spyOn(AuthenticationService, 'isAuthenticated').and.returnValue(false);
                const toState = {name: 'auth.login', url: '/login', data: {access: 'test'}};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                const event = $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect(event.defaultPrevented).toEqual(false);
                expect($state.go).not.toHaveBeenCalled();
                expect(AuthenticationService.isAuthorized).toHaveBeenCalledWith('test');
            });

            it('should redirect to `app.schedule` when user is authenticated and toState url is equal to `/`', () => {
                spyOn($state, 'go');
                spyOn(AuthenticationService, 'isAuthorized').and.returnValue(true);
                spyOn(AuthenticationService, 'isAuthenticated').and.returnValue(true);
                const toState = {name: 'test', url: '/', data: {access: 'test'}};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                const event = $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect(event.defaultPrevented).toEqual(true);
                expect($state.go).toHaveBeenCalledWith('app.schedule');
                expect(AuthenticationService.isAuthenticated).toHaveBeenCalled();
            });

            it('should not redirect to `app.schedule` when user is authenticated and toState url is not equal to `/`', () => {
                spyOn($state, 'go');
                spyOn(AuthenticationService, 'isAuthorized').and.returnValue(true);
                spyOn(AuthenticationService, 'isAuthenticated').and.returnValue(true);
                const toState = {name: 'test', url: '/test', data: {access: 'test'}};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                const event = $rootScope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect(event.defaultPrevented).toEqual(false);
                expect($state.go).not.toHaveBeenCalled();
                expect(AuthenticationService.isAuthenticated).toHaveBeenCalled();
            });
        });

        describe('$stateChangeSuccess', () => {
            it('should set `$rootScope.isLoading` to true when route contains resolve property', () => {
                const toState = {resolve: 'test'};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                $rootScope.$broadcast('$stateChangeSuccess', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect($rootScope.isLoading).toEqual(false);
            });

            it('should not set `$rootScope.isLoading` when route does not contain resolve property', () => {
                const toState = {};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                $rootScope.$broadcast('$stateChangeSuccess', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect($rootScope.isLoading).toBeFalsy();
            });
        });

        describe('$stateChangeError', () => {
            it('should set `$rootScope.isLoading` to true when route contains resolve property', () => {
                const toState = {resolve: 'test'};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                $rootScope.$broadcast('$stateChangeError', toState, null, null, null, {stack: 'error'}); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect($rootScope.isLoading).toEqual(false);
            });

            it('should not set `$rootScope.isLoading` when route does not contain resolve property', () => {
                const toState = {};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                $rootScope.$broadcast('$stateChangeError', toState, null, null, null, {stack: 'error'}); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect($rootScope.isLoading).toBeFalsy();
            });

            it('should catch error route changes and redirect to `500`', () => {
                spyOn($log, 'error');
                spyOn($state, 'go');
                const error = {stack: 'error'};
                OnRun.runFactory($rootScope, $state, $log, AuthenticationService);

                const event = $rootScope.$broadcast('$stateChangeError', {}, null, null, null, error); // the first argument is reserved for the event object (that's why we are not passing event object here)

                expect(event.defaultPrevented).toEqual(true);
                expect($state.go).toHaveBeenCalledWith('500');
                expect($log.error).toHaveBeenCalledWith(error.stack);
            });
        });
    });
});
