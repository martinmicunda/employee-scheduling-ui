/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Config, Inject} from '../../ng-decorators'; // jshint unused: false

class OnConfigProd {
    //start-non-standard
    @Config()
    @Inject('$compileProvider', '$httpProvider', 'localStorageServiceProvider')
    //end-non-standard
    static configFactory($compileProvider, $httpProvider, localStorageServiceProvider){
        // use "e-scheduling" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
        localStorageServiceProvider.setPrefix('employee-scheduling');

        // disabling debug data to get better performance gain in production
        $compileProvider.debugInfoEnabled(false);
        // configure $http service to combine processing of multiple http responses received at
        // around the same time via $rootScope.$applyAsync to get better performance gain in production
        $httpProvider.useApplyAsync(true);
    }
}

export {OnConfigProd};
