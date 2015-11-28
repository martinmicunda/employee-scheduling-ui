/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import availabilities from './fixtures/availabilities';
import AbstractResourceMock from '../abstract-resource-mock';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class AvailabilityResourceMock extends AbstractResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    runFactory($httpBackend, localStorageService){
        super.init($httpBackend, localStorageService, 'availabilities', {}, availabilities, 'note');
    }
}
