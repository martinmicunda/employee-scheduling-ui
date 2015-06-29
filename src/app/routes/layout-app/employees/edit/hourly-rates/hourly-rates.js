/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './hourly-rates.html!text';
import {RouteConfig} from '../../../../../ng-decorator'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.edit.hourly-rates', {
    url: '/hourly-rates',
    views: {
        'modal@': {
            template: template
        }
    }
})
//end-non-standard

class EmployeEditHourlyRates {}
