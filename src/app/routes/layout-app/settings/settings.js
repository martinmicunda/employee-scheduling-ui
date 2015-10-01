/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './language/language.js';
import './locations/locations.js';
import './positions/positions.js';
import './currency/currency.js';
import template from './settings.html!text';
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View} from '../../../ng-decorators.js'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings', {
    url: '/settings',
    abstract: true,
    template: '<settings></settings>',
    data: {
        access: ACCESS_LEVELS.admin
    }
})
@Component({
    selector: 'settings'
})
@View({
    template: template
})
//end-non-standard
class Settings {}

