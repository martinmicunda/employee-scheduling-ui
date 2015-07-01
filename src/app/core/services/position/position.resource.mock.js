/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import positionsEN from './fixtures/positions_en.json!json';
import positionsSK from './fixtures/positions_sk.json!json';
import {Run, Inject} from '../../../ng-decorator'; // jshint unused: false

//start-non-standard
@Run()
//end-non-standard
class PositionResourceMock {
    constructor($httpBackend) {
        $httpBackend.whenGET(/\/positions\?lang*/)
            .respond( (method, url) => {
                console.log('GET',url);
                if(url.includes('lang=en')) {
                    return [200, positionsEN];
                } else if(url.includes('lang=sk'))  {
                    return [200, positionsSK];
                }
            });
    }
    //start-non-standard
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        PositionResourceMock.instance = new PositionResourceMock($httpBackend);
        return PositionResourceMock.instance;
    }
}
