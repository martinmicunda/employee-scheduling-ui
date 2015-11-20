/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './complete/complete';
import './hourly-rate/hourly-rate';
import './bank-details/bank-details';
import './authorizations/authorizations';
import './account-details/account-details';
import './contact-details/contact-details';
import template from './add.html!text';
import {PROFILE_COMPLETENESS_TYPES, USER_ROLES} from '../../../../core/constants/constants';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.add', {
    url: '/add',
    onEnter: ['$modal', 'ModalService', ($modal, ModalService) => {
        $modal.open({
            template: template,
            resolve: {
                init: ['PositionModel', 'EmployeeModel', 'LocationModel',
                    (PositionModel, EmployeeModel, LocationModel) => Promise.all([PositionModel.initCollection(null, true), EmployeeModel.initItem(), LocationModel.initCollection(null, true)])]
            },
            controller: EmployeeAdd,
            controllerAs: 'vm',
            size: 'lg'
        }).result.finally(ModalService.onFinal('app.employees'));
    }]
})
@Inject('$state', '$rootScope', 'EmployeeModel', 'FormService', '$modalInstance')
//end-non-standard
class EmployeeAdd {
    constructor($state, $rootScope, EmployeeModel, FormService, $modalInstance) {
        this.modal = $modalInstance;
        this.router = $state;
        this.result = null;
        this.employee = EmployeeModel.getItem();
        this.isAdmin = $rootScope.currentUser.role === USER_ROLES.ADMIN;
        this.FormService = FormService;
        this.isSubmitting = null;
        this.EmployeeModel = EmployeeModel;
        this.profileCompletenessType = PROFILE_COMPLETENESS_TYPES.EMPLOYEE;
        this.saveButtonOptions = Object.assign({}, FormService.getModalSaveButtonOptions()); // clone the modal save button options so we don't overwrite default one
        this.saveButtonOptions.buttonDefaultText = 'Create an Employee';
        this.saveButtonOptions.buttonSuccessText = 'Created an Employee';
        this.saveButtonOptions.buttonSubmittingText = 'Creating an Employee';
        // only employeeAccountDetailsForm and employeeHourlyRateForm forms has required fields
        this.formSteps = [
            {route: 'app.employees.add.account-details', formName: 'employeeAccountDetailsForm', valid: false},
            {route: 'app.employees.add.contact-details', formName: 'employeeContactDetailsForm', valid: true},
            {route: 'app.employees.add.bank-details', formName: 'employeeBankDetailsForm', valid: true},
            {route: 'app.employees.add.hourly-rate', formName: 'employeeHourlyRateForm', valid: false},
            {route: 'app.employees.add.authorizations', formName: 'employeeAuthorizationsForm', valid: true},
            {route: 'app.employees.add.complete', formName: 'employeeCompleteForm', valid: true}
        ];

        if(!this.isAdmin) {
            // remove authorizations form for no admin role
            this.formSteps.splice(4, 1);
        }
        EmployeeModel.calculateProfileCompleteness(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    goToNextSection(isFormValid, form, route) {
        this.hasError = false;
        this.FormService.submitChildForm(this.router.current.name, form, this.formSteps);
        if(isFormValid) {
            this.EmployeeModel.calculateProfileCompleteness(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
            if(route) {
                this.router.go(route);
            } else {
                form.$setPristine();
                this.router.go(this.FormService.nextState(this.router.current.name, this.formSteps));
            }
        }
    }

    goToPreviousSection() {
        this.EmployeeModel.calculateProfileCompleteness(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        this.router.go(this.FormService.previousState(this.router.current.name, this.formSteps));
    }

    save(form) {
        if(this.FormService.hasInvalidChildForms(this.router, this.formSteps)) {return;}

        this.isSubmitting = true;
        this.FormService.save(this.EmployeeModel, this.employee, this, form);
    }
}

export default EmployeeAdd;
