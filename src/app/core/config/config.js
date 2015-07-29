/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './config.test'; // TODO: (martin) use systemJs conditional imports
import {Config, Inject} from '../../ng-decorators'; // jshint unused: false

class Configuration {
    //start-non-standard
    @Config()
    @Inject('$locationProvider', '$provide', '$urlRouterProvider', 'RestangularProvider')
    //end-non-standard
    static configFactory($locationProvider, $provide, $urlRouterProvider, RestangularProvider){
        // overwrite the default behaviour for $uiViewScroll service (scroll to top of the page)
        $provide.decorator('$uiViewScroll', ['$delegate', '$window', function ($delegate, $window) {
            return function () {
                $window.scrollTo(0,0);
            };
        }]);

        // TODO: https://github.com/willmendesneto/keepr/blob/master/dist%2Fkeepr.js and http://willmendesneto.github.io/2014/10/28/creating-a-crud-in-a-single-angular-controller/ for crypto locale storage
        // enhance localStorageService
        $provide.decorator('localStorageService', ['$delegate', '$window', function($delegate, $window) {
            $delegate.findLocalStorageItems = function (query) {
                let i, results = [];
                for (i in $window.localStorage) {
                    if ($window.localStorage.hasOwnProperty(i)) {
                        if (i.match(query) || (!query && typeof i === 'string')) {
                            const value = JSON.parse($window.localStorage.getItem(i));
                            results.push(value);
                        }
                    }
                }
                return results;
            };

            return $delegate;
        }]);

        /*********************************************************************
         * Route provider configuration based on these config constant values
         *********************************************************************/
        // set restful base API Route
        RestangularProvider.setBaseUrl('/api');

        // use the HTML5 History API
        $locationProvider.html5Mode(true);

        // for any unmatched url, send to 404 page (Not page found)
        $urlRouterProvider.otherwise('/employees');

        // the `when` method says if the url is `/` redirect to `/dashboard` what is basically our `home` for this application
        $urlRouterProvider.when('/', '/employees');
    }
}
