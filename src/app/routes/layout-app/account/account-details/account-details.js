/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './account-details.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account.account-details', {
    url: '/account-details',
    template: '<account-details></account-details>'
})
@Component({
    selector: 'account-details'
})
@View({
    template: template
})
@Inject('EmployeeModel', 'SettingModel', 'Upload', 'FormService', 'EmployeeResource')
//end-non-standard
class AccountDetails {
    constructor(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource) {
        this.Upload = Upload;
        this.employee = Object.assign({}, EmployeeModel.getItem());
        this.employeeCloned = EmployeeModel.getItem(); // to reset profile completeness data
        this.FormService = FormService;
        this.SettingModel = SettingModel;
        this.EmployeeModel = EmployeeModel;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
        this.result = null;
        this.isSubmitting = null;
        this.EmployeeModel.calculateProfileCompleteness();
        this.EmployeeResource = EmployeeResource;
    }

    removeAvatar() {
        this.employee.avatar = this.SettingModel.getItem().avatar;
    }

    addAvatar(file) {
        const disallowObjectUrl = true;
        return this.Upload.dataUrl(file, disallowObjectUrl).then(url => this.employee.avatar = url);
    }

    save(form) {
        if(!form.$valid) {return;}

        this.isSubmitting = true;
        return this.EmployeeResource.updateAccountDetails(this.employee).then(data => {
            this.employee.cas = data.cas;
            this.employeeCloned.avatar = this.employee.avatar;
            this.employeeCloned.firstName = this.employee.firstName;
            this.employeeCloned.lastName = this.employee.lastName;
            this.employeeCloned.email = this.employee.email;
            this.employeeCloned.note = this.employee.note;
            this.EmployeeModel.calculateProfileCompleteness();
            form.$setPristine();
            this.FormService.onSuccess(this);
        }, response => {
            form.$setPristine();
            this.FormService.onFailure(this, response);
        });
    }
}

export default AccountDetails;
