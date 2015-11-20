/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './account-details/account-details';
import './authorizations/authorizations';
import './bank-details/bank-details';
import './contact-details/contact-details';
import './hourly-rate/hourly-rate';
import './password/password';
import template from './edit.html!text';
import {PROFILE_COMPLETENESS_TYPES} from '../../../../core/constants/constants';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$modal', 'ModalService', ($stateParams, $modal, ModalService) => {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            resolve: {
                init: ['PositionModel', 'EmployeeModel', 'LocationModel',
                    (PositionModel, EmployeeModel, LocationModel) => Promise.all([PositionModel.initCollection(null, true), EmployeeModel.initItem(id), LocationModel.initCollection(null, true)])]
            },
            controller: EmployeeEdit,
            controllerAs: 'vm',
            size: 'lg'
        }).result.then(ModalService.onSuccess(), ModalService.onError($modal, 'app.employees')).finally(ModalService.onFinal('app.employees'));
    }]
})
@Inject('$state', '$modalInstance', 'EmployeeModel', 'FormService')
//end-non-standard
class EmployeeEdit {
    constructor($state, $modalInstance, EmployeeModel, FormService) {
        this.name = `${EmployeeModel.getItem().firstName} ${EmployeeModel.getItem().lastName}`;
        this.modal = $modalInstance;
        this.avatar = EmployeeModel.getItem().avatar;
        this.router = $state;
        this.result = null;
        this.employee = EmployeeModel.getItem();
        this.FormService = FormService;
        this.isSubmitting = null;
        this.EmployeeModel = EmployeeModel;
        this.profileCompletenessType = PROFILE_COMPLETENESS_TYPES.EMPLOYEE;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
        // only employeeAccountDetailsForm and employeeHourlyRateForm forms has required fields
        this.formSteps = [
            {route: 'app.employees.edit.account-details', formName: 'employeeAccountDetailsForm', valid: false},
            {route: 'app.employees.edit.contact-details', formName: 'employeeContactDetailsForm', valid: true},
            {route: 'app.employees.edit.bank-details', formName: 'employeeBankDetailsForm', valid: true},
            {route: 'app.employees.edit.hourly-rate', formName: 'employeeHourlyRateForm', valid: false},
            {route: 'app.employees.edit.authorizations', formName: 'employeeAuthorizationsForm', valid: true},
            {route: 'app.employees.edit.password', formName: 'employeePasswordForm', valid: true}
        ];
        EmployeeModel.calculateProfileCompleteness(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    goToNextSection(isFormValid, form, route) {
        this.hasError = false;
        this.FormService.submitChildForm(this.router.current.name, form, this.formSteps);
        if(isFormValid) {
            this.router.go(route);
        }
    }

    save(form) {
        if(!form.$valid) {return;}

        // delete cancel function from this object so we don't close modal once the data are saved successfully
        const self = Object.getPrototypeOf(this);
        delete self.cancel;

        this.isSubmitting = true;
        return this.FormService.save(this.EmployeeModel, this.employee, this, form).then(() => {
            this.name = `${this.EmployeeModel.getItem().firstName} ${this.EmployeeModel.getItem().lastName}`;
            this.avatar = this.EmployeeModel.getItem().avatar;
            this.EmployeeModel.calculateProfileCompleteness(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        }).finally(() => {
            self.cancel = function cancel() {this.modal.dismiss('cancel');}; // do not use arrow function as this function needs to have a name
        });
    }
}

export default EmployeeEdit;
