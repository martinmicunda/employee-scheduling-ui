/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './account/account';
import './availability/availability';
import './documents/documents';
import './documents-files/documents-files';
import './employees/employees';
import './partners/partners';
import './reports/reports';
import './schedule/schedule';
import './settings/settings.js';
import template from './layout-app.html!text';
import {RouteConfig} from '../../ng-decorators';  // jshint unused: false

//start-non-standard
@RouteConfig('app', {
    url: '',
    abstract: true,
    template: template,
    resolve: {
        init: ['SettingModel', SettingModel => SettingModel.initItem('app', null, true)]
    }
})
//end-non-standard
class LayoutApp {}
