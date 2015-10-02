/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../../../core/constants/constants';
import template from './password.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.edit.password', {
    url: '/password',
    views: {
        'modal@': {
            template: '<password></password>'
        }
    },
    data: {
        access: ACCESS_LEVELS.admin
    }
})
@Component({
    selector: 'password'
})
@View({
    template: template
})
@Inject('EmployeeModel')
//end-non-standard
class EmployeeEditPassword {
    constructor(EmployeeModel) {
        this.employee = EmployeeModel.getItem();
    }
}

export default EmployeeEditPassword;
