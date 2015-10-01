/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './schedule.html!text';
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.schedule', {
    url: '/schedule',
    template: '<schedule></schedule>',
    data: {
        access: ACCESS_LEVELS.employee
    }
})
@Component({
    selector: 'schedule'
})
@View({
    template: template
})
//end-non-standard
class Schedule {}
