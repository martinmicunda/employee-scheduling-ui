/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.edit.contact-details', {
    url: '/contact-details',
    views: {
        'modal@': {
            template: '<employee-contact-details></employee-contact-details>'
        }
    }
})
//end-non-standard
class EmployeeEditContactDetails {}
