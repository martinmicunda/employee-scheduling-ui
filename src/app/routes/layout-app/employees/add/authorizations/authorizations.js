/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.add.authorizations', {
    url: '/authorizations',
    views: {
        'modal@': {
            template: '<employee-authorizations></employee-authorizations>'
        }
    }
})
//end-non-standard
class EmployeeAddAuthorizations {}
