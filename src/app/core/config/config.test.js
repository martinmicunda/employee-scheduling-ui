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
import {Config, Run, Inject} from '../../ng-decorator'; // jshint unused: false

//start-non-standard
@Config()
//end-non-standard
class ConfigurationTest {
    constructor($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    }

    static configFactory($provide){
        ConfigurationTest.instance = new ConfigurationTest($provide);
        return ConfigurationTest.instance;
    }
}
ConfigurationTest.configFactory.$inject = ['$provide'];


//start-non-standard
@Run()
//end-non-standard
class OnRunTest {
    constructor($httpBackend) {
        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
    }
    static runFactory($httpBackend){
        OnRunTest.instance = new OnRunTest($httpBackend);
        return OnRunTest.instance;
    }
}
OnRunTest.runFactory.$inject = ['$httpBackend'];


