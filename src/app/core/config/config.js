/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './config.test'; // TODO: (martin) use systemJs conditional imports
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
        // set restful base API Route
        $httpProvider.interceptors.push('ApiUrlHttpInterceptor');

        // use the HTML5 History API
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // for any unmatched url, send to 404 page (Not page found)
        $urlRouterProvider.otherwise('/404');

        // the `when` method says if the url is `/` redirect to `/dashboard` what is basically our `home` for this application
        $urlRouterProvider.when('/', '/employees');
    }
}

class OnRun {
    //start-non-standard
    @Run()
    @Inject('$rootScope', '$state', '$log')
    //end-non-standard
    static runFactory($rootScope, $state, $log){
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            event.preventDefault();
            $log.error(error.stack);
            $state.go('500');
        });
    }
}

export {OnConfig, OnRun};
