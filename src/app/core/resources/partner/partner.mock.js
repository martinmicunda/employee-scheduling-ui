/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import partner1 from './fixtures/partner_1.json!json';
import partners from './fixtures/partners.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class PositionResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/partners\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                if(url.includes('partners/1')) {
                    return [200, partner1];
                } else if(url.includes('partners/2')) {
                    return [404];
                } else if(url.includes('partners/3')) {
                    return [500];
                }

                return [200, partner1];
            });

        $httpBackend.whenGET(/\/partners/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, partners];
            });

        $httpBackend.whenPOST(/\/partners/)
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

        $httpBackend.whenPUT(/\/partners/)
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

        $httpBackend.whenDELETE(/\/partners/)
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
