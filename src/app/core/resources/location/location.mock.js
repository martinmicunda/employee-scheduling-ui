/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import locations from './fixtures/locations.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class LocationResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/locations/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, locations];
            });
    }
}
