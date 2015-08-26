'use strict';

import {OnConfig} from './config.js';

describe('Config', () => {
    let $urlRouterProvider, $provide, $locationProvider, $httpProvider, $state;

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
        expect($httpProvider.interceptors[0]).toEqual('ApiUrlHttpInterceptor');
    });

    it('should use the HTML5 History API (set to true)', () => {
        expect($locationProvider.html5Mode).toHaveBeenCalledWith(true);
    });

    it('should redirect to `/404` for any unmatched url route', () => {
        expect($urlRouterProvider.otherwise).toHaveBeenCalledWith('/404');
    });

    it('should redirect to `/deals` when url match `/`', () => {
        expect($urlRouterProvider.when).toHaveBeenCalledWith('/', '/employees');
    });

    // FIXME
    //describe('Run', () => {
    //
    //    beforeEach(inject((_$rootScope_, _$log_) => {
    //        $log = _$log_;
    //        $rootScope = _$rootScope_;
    //    }));
    //
    //    it('should catch unauthorised route changes and route to log in', function() {
    //        spyOn($log, 'error');
    //        let error = {stack: 'error'};
    //        OnRun.runFactory($rootScope, $state, $log);
    //
    //        $rootScope.$emit('$stateChangeError', null, null, null, null, null, error);
    //
    //        expect($state.go).toHaveBeenCalledWith('error');
    //        expect($log.error).toHaveBeenCalledWith(error.stack);
    //    });
    //})
});
