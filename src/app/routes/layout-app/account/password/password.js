/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './password.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account.password', {
    url: '/password',
    template: '<password-details></password-details>'
})
@Component({
    selector: 'password-details'
})
@View({
    template: template
})
@Inject('EmployeeModel', 'FormService')
//end-non-standard
class Password {
    constructor(EmployeeModel, FormService) {
        this.employee = EmployeeModel.getItem();
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.EmployeeModel = EmployeeModel;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
    }

    save(form) {
        if(!form.$valid) {return;}

        this.isSubmitting = true;
        return this.FormService.save(this.EmployeeModel, this.employee, this, form).then(() => {
            this.EmployeeModel.calculateProfileCompleteness();
        });
    }
}

export default Password;
// http://blog.xebia.com/2014/11/26/how-to-implement-validation-callbacks-in-angularjs-1-3/ password validation
