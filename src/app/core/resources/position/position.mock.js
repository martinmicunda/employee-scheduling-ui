/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import position1 from './fixtures/position_1.json!json';
import positions from './fixtures/positions.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class PositionResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    static runFactory($httpBackend, localStorageService){
        positions.forEach(function (position) {
            localStorageService.set(`position_${position.id}`, position);
        });

        $httpBackend.whenGET(/\/positions\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                const id = url.match(/\/positions\/(\d+)/)[1];
                const positionLocal = localStorageService.get(`position_${id}`);

                if(id === '404') {
                    return [404];
                } else if(id === '500') {
                    return [500];
                }

                return [200, positionLocal ? positionLocal : position1];
            });

        $httpBackend.whenGET(/\/positions/)
            .respond( (method, url) => {
                console.log('GET',url);
                const positionsLocal = localStorageService.findLocalStorageItems(/\.position_(\d+)/);

                return [200, positionsLocal.length > 0 ? positionsLocal : positions];
            });

        $httpBackend.whenPOST(/\/positions/)
            .respond( (method, url, data) => {
                console.log('POST',url);
                data = JSON.parse(data);

                if(data.name === '500') {
                    return [500];
                } else if(data.name === '409') {
                    return [409];
                }

                data.id = Math.floor(Date.now() / 1000);
                localStorageService.set(`position_${data.id}`, data);

                return [201, {id: data.id}];
            });

        $httpBackend.whenPUT(/\/positions/)
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

                localStorageService.set(`position_${data.id}`, data);
                return [200, data];
            });

        $httpBackend.whenDELETE(/\/positions/)
            .respond( (method, url, data) => {
                console.log('DELETE',url);
                data = JSON.parse(data);

                if(data.name === '404') {
                    return [404];
                } else if(data.name === '500') {
                    return [500];
                }

                const id = url.match(/\/positions\/(\d+)/)[1];
                localStorageService.remove(`position_${id}`);

                return [204];
            });
    }
}
