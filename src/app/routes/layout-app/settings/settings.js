/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './language/language';
import './locations/locations';
import './positions/positions';
import template from './settings.html!text';
import {RouteConfig} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings', {
    url: '/settings',
    abstract: true,
    template: template
})
//end-non-standard
class Settings {}


