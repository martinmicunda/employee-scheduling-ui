/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './account-details/account-details';
import './contact-details/contact-details';
import './password/password';
import template from './account.html!text';
import {RouteConfig, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account', {
    url: '/account',
    abstract: true,
    template: template,
    resolve: {
        employee: ['EmployeeResource', EmployeeResource => EmployeeResource.get('1')]
    }
})
@Inject('employee', 'EmployeeService')
//end-non-standard
class Account {
    constructor(employee, EmployeeService) {
        this.EmployeeService = EmployeeService;
        this.employee = employee;
        this.profileComplete = EmployeeService.calculateProfileCompleteness(employee);
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = {
            iconsPosition: 'right',
            buttonDefaultText: 'Save',
            buttonSubmittingText: 'Saving',
            buttonSuccessText: 'Saved',
            animationCompleteTime: '1200'
        };
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.profileComplete = this.EmployeeService.calculateProfileCompleteness(this.employee);
        this.employee.put().then((employee) => {
            this.employee = employee;
            this.result = 'success';
            form.$setPristine();
        }, (response) => {
            this.result = 'error';
            if(response.status === 409) {
                //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing');
            } else {
                //toaster.pop('error', 'Error:', 'Location could not be updated. Please try again!');
            }
        });
    }
}
