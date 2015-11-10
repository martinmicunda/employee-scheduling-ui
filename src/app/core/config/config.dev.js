/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Config, Inject} from '../../ng-decorators'; // jshint unused: false

class OnConfigDev {
    //start-non-standard
    @Config()
    @Inject('localStorageServiceProvider')
    //end-non-standard
    static configFactory(localStorageServiceProvider){
        // use "e-scheduling" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
        localStorageServiceProvider.setPrefix('employee-scheduling-dev');
    }
}
