/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import rolesEN from './fixtures/roles_en.json!json';
import rolesSK from './fixtures/roles_sk.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class RoleResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/roles\?lang*/)
            .respond( (method, url) => {
                console.log('GET',url);
                if(url.includes('lang=en')) {
                    return [200, rolesEN];
                } else if(url.includes('lang=sk'))  {
                    return [200, rolesSK];
                }
            });
    }
}
