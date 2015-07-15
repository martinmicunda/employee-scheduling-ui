/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import settingApp from './fixtures/setting_app.json!json';
import settings from './fixtures/settings.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class SettingResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        $httpBackend.whenGET(/\/settings\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);

                return [200, settingApp];
            });

        $httpBackend.whenGET(/\/settings/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, settings];
            });

        $httpBackend.whenPUT(/\/settings/)
            .respond( (method, url, data) => {
                console.log('PUT',url);
                data = JSON.parse(data);

                if(data.language === '404') {
                    return [404];
                } else if(data.language === '409') {
                    return [409];
                } else if(data.language === '500') {
                    return [500];
                }

                return [200, data];
            });
    }
}
