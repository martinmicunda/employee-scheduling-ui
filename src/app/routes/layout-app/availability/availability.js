/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './availability.html!text';
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

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
@Inject('AvailabilityService')
//end-non-standard
class Availability {
    constructor(AvailabilityService) {
        this.calendarData = AvailabilityService.getCalendarData();
        this.calendarConfig = AvailabilityService.getCalendarConfig();
    }
}

export default Availability;
// !!! http://24days.in/umbraco/2014/extending-umbraco-7-backend/extend-with-angularjs-and-typescript/
// !! http://calendar.demo.title.dk/calendar/
// !! https://www.silverstripe.org/blog/managing-events-with-silverstripe-a-new-calendar-module/ --> check ORM model schema
