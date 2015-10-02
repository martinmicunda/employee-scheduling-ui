/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../../../core/constants/constants';
import {RouteConfig} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.edit.authorizations', {
    url: '/authorizations',
    views: {
        'modal@': {
            template: '<employee-authorizations></employee-authorizations>'
        }
    },
    data: {
        access: ACCESS_LEVELS.admin
    }
})
//end-non-standard
class EmployeeEditAuthorizations {}
