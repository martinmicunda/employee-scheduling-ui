/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

/**
 * Stubbing of HTTP requests for backend-less frontend testing
 */
import 'angular-mocks';
import angular from 'angular';
import {Config, Run, Inject} from '../../ng-decorators'; // jshint unused: false

class ConfigurationTest {
    //start-non-standard
    @Config()
    @Inject('$provide')
    //end-non-standard
    static configFactory($provide){
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }
}

class OnRunTest {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
    }
}
