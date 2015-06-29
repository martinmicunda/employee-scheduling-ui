/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import locations from './fixtures/locations.json!json';
import {Run, Inject} from '../../../ng-decorator'; // jshint unused: false

//start-non-standard
@Run()
//end-non-standard
class LocationResourceMock {
    constructor($httpBackend) {
        $httpBackend.whenGET(/\/locations/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, locations];
            });
    }
    static runFactory($httpBackend){
        LocationResourceMock.instance = new LocationResourceMock($httpBackend);
        return LocationResourceMock.instance;
    }
}
LocationResourceMock.runFactory.$inject = ['$httpBackend'];
