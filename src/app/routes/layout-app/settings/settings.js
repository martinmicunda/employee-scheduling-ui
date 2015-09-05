/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './language/language.js';
import './locations/locations.js';
import './positions/positions.js';
import template from './settings.html!text';
import {RouteConfig, Component, View} from '../../../ng-decorators.js'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings', {
    url: '/settings',
    abstract: true,
    template: '<settings></settings>'
})
@Component({
    selector: 'settings'
})
@View({
    template: template
})
//end-non-standard
class Settings {}

