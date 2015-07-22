/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import position from './fixtures/position_1.json!json';
import positions from './fixtures/positions.json!json';
import AbstractResourceMock from '../abstract-resource-mock';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class PositionResourceMock extends AbstractResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    runFactory($httpBackend, localStorageService){
        super.init($httpBackend, localStorageService, 'positions', position, positions, 'name');
    }
}
