/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './config.#{ENV|environment}.js';
import {ACCESS_LEVELS} from '../constants/constants.js';
import {Config, Run, Inject} from '../../ng-decorators'; // jshint unused: false

class OnConfig {
    //start-non-standard
    @Config()
    @Inject('$locationProvider', '$provide', '$urlRouterProvider', '$httpProvider')
    //end-non-standard
    static configFactory($locationProvider, $provide, $urlRouterProvider, $httpProvider){
        // overwrite the default behaviour for $uiViewScroll service (scroll to top of the page)
        $provide.decorator('$uiViewScroll', ['$delegate', '$window', function ($delegate, $window) {
            return function () {
                $window.scrollTo(0,0);
            };
        }]);

        /*********************************************************************
         * Route provider configuration based on these config constant values
         *********************************************************************/
        // set restful base API route
        $httpProvider.interceptors.push('HttpApiUrlInterceptor');

        // set authentication http token check
        $httpProvider.interceptors.push('HttpAuthenticationInterceptor');

        // set retry http request if request failed
        $httpProvider.interceptors.push('HttpRetryInterceptor');

        // use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // for any unmatched url, send to 404 page (Not page found)
        $urlRouterProvider.otherwise('/404');

        // the `when` method says if the url is `/home` redirect to `/schedule` what is basically our `home` for this application
        $urlRouterProvider.when('/home', '/schedule');
    }
}

class OnRun {
    //start-non-standard
    @Run()
    @Inject('$rootScope', '$state', '$log', 'AuthenticationService')
    //end-non-standard
    static runFactory($rootScope, $state, $log, AuthenticationService){
        $rootScope.currentUser = AuthenticationService.getCurrentUser();
        $rootScope.ACCESS_LEVELS = ACCESS_LEVELS;

        $rootScope.$on('$stateChangeStart', (event, toState) => {
            if (toState.resolve) {
                $rootScope.isLoading = true;
            }

            if(!('data' in toState) || !('access' in toState.data)){
                event.preventDefault();
                $state.go('403');
            } else if (!AuthenticationService.isAuthorized(toState.data.access) && toState.name !== 'auth.login') {
                event.preventDefault();
                if(AuthenticationService.isAuthenticated()) {
                    $state.go('403');
                } else {
                    $state.go('auth.login');
                }
            } else if(AuthenticationService.isAuthenticated() && toState.url === '/') {
                event.preventDefault();
                $state.go('app.schedule');
            }
        });

        $rootScope.$on('$stateChangeSuccess', (event, toState) => {
            if (toState.resolve) {
                $rootScope.isLoading = false;
            }
        });

        $rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
            if (toState.resolve) {
                $rootScope.isLoading = false;
            }

            event.preventDefault();
            $log.error(error.stack);
            $state.go('500');
        });
    }
}

export {OnConfig, OnRun};
