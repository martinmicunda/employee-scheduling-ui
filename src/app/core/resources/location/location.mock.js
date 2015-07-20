/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import location1 from './fixtures/location_1.json!json';
import locations from './fixtures/locations.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class LocationResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    static runFactory($httpBackend, localStorageService){
        locations.forEach(function (location) {
            localStorageService.set(`location_${location.id}`, location);
        });

        $httpBackend.whenGET(/\/locations\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                const id = url.match(/\/locations\/(\d+)/)[1];
                const locationLocal = localStorageService.get(`location_${id}`);

                if(id === '404') {
                    return [404];
                } else if(id === '500') {
                    return [500];
                }

                return [200, locationLocal ? locationLocal : location1];
            });

        $httpBackend.whenGET(/\/locations/)
            .respond( (method, url) => {
                console.log('GET',url);
                const locationsLocal = localStorageService.findLocalStorageItems(/\.location_(\d+)/);

                return [200, locationsLocal.length > 0 ? locationsLocal : locations];
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

                data.id = Math.floor(Date.now() / 1000);
                localStorageService.set(`location_${data.id}`, data);

                return [201, {id: data.id}];
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

                localStorageService.set(`location_${data.id}`, data);
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

                const id = url.match(/\/locations\/(\d+)/)[1];
                localStorageService.remove(`location_${id}`);

                return [204];
            });
    }
}
