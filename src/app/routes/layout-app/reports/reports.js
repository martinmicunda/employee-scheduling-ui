/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './reports.html!text';
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.reports', {
    url: '/reports',
    template: '<reports></reports>',
    data: {
        access: ACCESS_LEVELS.admin
    }
})
@Component({
    selector: 'reports'
})
@View({
    template: template
})
//end-non-standard
class Reports {}
