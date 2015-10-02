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
@Inject('EmployeeModel', 'FormService', 'AuthenticationResource')
//end-non-standard
class Password {
    constructor(EmployeeModel, FormService, AuthenticationResource) {
        this.employee = EmployeeModel.getItem();
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.EmployeeModel = EmployeeModel;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
        this.AuthenticationResource = AuthenticationResource;
        this.EmployeeModel.calculateProfileCompleteness();
    }

    save(form) {
        if(!form.$valid) {return;}

        this.isSubmitting = true;
        this.passwords.id = this.employee.id;
        return this.AuthenticationResource.updatePassword(this.passwords).then(() => {
            this.passwords = {};
            form.$setPristine();
            this.result = 'success';
            this.hasSuccess = true;
            this.hasError = false;
            this.successMessage = 'Your password has been changed successfully.';
        }, (response) => {
            form.$setPristine();
            this.result = 'error';
            this.hasError = true;
            this.hasSuccess = false;

            if(response.status === 400) {
                this.errorMessage = 'The current password is incorrect.';
            } else {
                this.FormService.onFailure(this, response);
            }
        });
    }
}

export default Password;
// https://stormpath.com/blog/the-pain-of-password-reset/
