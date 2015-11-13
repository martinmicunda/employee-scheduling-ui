/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './contact-details.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account.contact-details', {
    url: '/contact-details',
    template: '<contact-details></contact-details>'
})
@Component({
    selector: 'contact-details'
})
@View({
    template: template
})
@Inject('EmployeeModel', 'FormService', 'EmployeeResource')
//end-non-standard
class ContactDetails {
    constructor(EmployeeModel, FormService, EmployeeResource) {
        this.employee = EmployeeModel.getItem();
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.EmployeeModel = EmployeeModel;
        this.EmployeeResource = EmployeeResource;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
        this.EmployeeModel.calculateProfileCompleteness();
    }

    save(form) {
        if(!form.$valid) {return;}

        this.isSubmitting = true;
        return this.EmployeeResource.updateAccountDetails(this.employee).then(data => {
            this.employee.cas = data.cas;
            this.EmployeeModel.calculateProfileCompleteness();
            form.$setPristine();
            this.FormService.onSuccess(this);
        }, response => {
            form.$setPristine();
            this.FormService.onFailure(this, response);
        });
    }
}

export default ContactDetails;
