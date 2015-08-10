/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'employee-save-button'
})
@View({
    template: `
        <jp-ng-bs-animated-button class="btn btn-sm btn-success" ng-click="vm.save()" is-submitting="vm.isSubmitting" result="vm.result" options="vm.saveButtonOptions"></jp-ng-bs-animated-button>
    `,
    scope: {
        form: '='
    },
    bindToController: {
        form: '='
    }
})
@Inject('EmployeeModel', 'FormService')
//end-non-standard
class EmployeeSaveButton {
    constructor(EmployeeModel, FormService) {
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.EmployeeModel = EmployeeModel;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
    }

    save() {
        if(!this.form.$valid) {return;}
        this.isSubmitting = true;
        //this.profileComplete = this.EmployeeModel.calculateProfileCompleteness(this.employee);
        this.FormService.save(this.EmployeeModel, this.EmployeeModel.getItem(), this, this.form);
    }
}
