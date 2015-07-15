/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import location1 from './fixtures/location_1.json!json';
import location2 from './fixtures/location_2.json!json';
import location3 from './fixtures/location_3.json!json';
import location4 from './fixtures/location_4.json!json';
import locations from './fixtures/locations.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class LocationResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/locations\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                if(url.includes('locations/1')) {
                    return [200, location1];
                } else if(url.includes('locations/2')) {
                    return [200, location2];
                } else if(url.includes('locations/3')) {
                    return [200, location3];
                } else if(url.includes('locations/5')) {
                    return [404];
                } else if(url.includes('locations/6')) {
                    return [500];
                }

                return [200, location4];
            });

        $httpBackend.whenGET(/\/locations/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, locations];
            });

        $httpBackend.whenPOST(/\/locations/)
            .respond( (method, url, data) => {
                console.log('POST',url);
                data = JSON.parse(data);

                if(data.name === '500') {
                    return [500];
                } else if(data.name === '409') {
                    return [409];
                }

                return [201, {id:'7'}];
            });

        $httpBackend.whenPUT(/\/locations/)
            .respond( (method, url, data) => {
                console.log('PUT',url);
                data = JSON.parse(data);

                if(data.name === '404') {
                    return [404];
                } else if(data.name === '409') {
                    return [409];
                } else if(data.name === '500') {
                    return [500];
                }

                return [200, data];
            });

        $httpBackend.whenDELETE(/\/locations/)
            .respond( (method, url, data) => {
                console.log('DELETE',url);
                data = JSON.parse(data);

                if(data.name === '404') {
                    return [404];
                } else if(data.name === '500') {
                    return [500];
                }

                return [204];
            });
    }
}
