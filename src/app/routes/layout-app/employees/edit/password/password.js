/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './password.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.edit.password', {
    url: '/password',
    views: {
        'modal@': {
            template: '<password></password>'
        }
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
