/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import currencies from './fixtures/currencies.json!json';
import {HEADER_API_VERSION} from '../../constants/constants';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class CurrencyResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/currencies/)
            .respond( (method, url, data, headers) => {
                console.log('GET',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                return [200, currencies];
            });
    }
}
