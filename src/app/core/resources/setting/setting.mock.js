/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import setting from './fixtures/setting_app.json!json';
import settings from './fixtures/settings.json!json';
import AbstractResourceMock from '../abstract-resource-mock';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class SettingResourceMock extends AbstractResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    runFactory($httpBackend, localStorageService){
        super.init($httpBackend, localStorageService, 'settings', setting, settings, 'language');
    }
}
