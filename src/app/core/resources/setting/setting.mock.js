/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import settings from './fixtures/settings.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class SettingResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/settings\?*/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, settings];
            });
    }
}
