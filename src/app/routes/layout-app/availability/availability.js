/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './availability.html!text';
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.availability', {
    url: '/availability',
    template: '<availability></availability>',
    data: {
        access: ACCESS_LEVELS.employee
    }
})
@Component({
    selector: 'availability'
})
@View({
    template: template
})
//end-non-standard
class Availability {}
