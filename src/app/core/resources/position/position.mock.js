/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import position1 from './fixtures/position_1.json!json';
import position2 from './fixtures/position_2.json!json';
import position3 from './fixtures/position_3.json!json';
import position4 from './fixtures/position_4.json!json';
import positions from './fixtures/positions.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class PositionResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/positions\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                if(url.includes('positions/1')) {
                    return [200, position1];
                } else if(url.includes('positions/2')) {
                    return [200, position2];
                }  else if(url.includes('positions/3')) {
                    return [200, position3];
                }

                return [200, position4];
            });

        $httpBackend.whenGET(/\/positions/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, positions];
            });

        $httpBackend.whenPOST(/\/positions/)
            .respond( (method, url, data) => {
                console.log('POST',url);
                data = JSON.parse(data);

                if(data.name === '500')  {
                    return [500, {}];
                }

                return [201, {id:'5'}];
            });

        $httpBackend.whenPUT(/\/positions/)
            .respond( (method, url, data) => {
                console.log('PUT',url);
                data = JSON.parse(data);

                if(data.name === '404') {
                    return [404, {}];
                } else if(data.name === '409')  {
                    return [409, {}];
                } else if(data.name === '500')  {
                    return [500, {}];
                }

                return [200, data];
            });
    }
}
