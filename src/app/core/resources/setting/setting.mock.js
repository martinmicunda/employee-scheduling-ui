/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import settings from './fixtures/settings.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Run()
//end-non-standard
class SettingResourceMock {
    constructor($httpBackend) {
        $httpBackend.whenGET(/\/settings\?*/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, settings];
            });
    }
    //start-non-standard
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        SettingResourceMock.instance = new SettingResourceMock($httpBackend);
        return SettingResourceMock.instance;
    }
}
