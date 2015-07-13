/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Config, Inject} from '../../ng-decorators'; // jshint unused: false

class ConfigurationProd {
    //start-non-standard
    @Config()
    @Inject('$compileProvider', '$httpProvider')
    //end-non-standard
    static configFactory($compileProvider, $httpProvider){
        // disabling debug data to get better performance gain in production
        $compileProvider.debugInfoEnabled(false);
        // configure $http service to combine processing of multiple http responses received at
        // around the same time via $rootScope.$applyAsync to get better performance gain in production
        $httpProvider.useApplyAsync(true);
    }
}
