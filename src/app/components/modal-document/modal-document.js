/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './modal-document.html!text';
import {USER_ROLES} from '../../core/constants/constants';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-document'
})
@View({
    template: template
})
@Inject('ModalModel', 'DocumentModel', 'EmployeeModel', 'DocumentService', 'FormService')
//end-non-standard
class PartnerModal {
    constructor(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService) {
        this.modal = ModalModel.getItem();
        this.document = DocumentModel.getItem();
        this.employees = EmployeeModel.getCollection();
        this.selectedEmployeeWithAccess = [];
        this.selectedEmployeeWithoutAccess = [];
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.DocumentModel = DocumentModel;
        this.DocumentService = DocumentService;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
        if(this.document.id) {
            this.employeesWithAccess = this.employees.filter((employee) => this.document.employees.filter((emp) => emp === employee.id).length > 0);
            this.employeesWithoutAccess = this.employees.filter((employee) => employee.USER_ROLES !== USER_ROLES.MANAGER && employee.USER_ROLES !== USER_ROLES.ADMIN && this.document.employees.filter((emp) => emp === employee.id).length === 0);
        } else {
            this.employeesWithAccess = [];
            this.employeesWithoutAccess = this.employees.filter((employee) => employee.USER_ROLES !== USER_ROLES.MANAGER && employee.USER_ROLES !== USER_ROLES.ADMIN); // TODO: (martin) this should not be required and instead value should be filtered on back end
        }
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.document.employees = [];
        if(this.document.isLocked) {
            this.employeesWithAccess.forEach(employee => this.document.employees.push(employee.id));
        }
        this.FormService.save(this.DocumentModel, this.document, this, form);
    }

    addAccess() {
        const employeesWithAccess = this.DocumentService.grantAccess(this.selectedEmployeeWithoutAccess, this.employeesWithoutAccess, this.employeesWithAccess);
        if(employeesWithAccess) {this.employeesWithAccess = employeesWithAccess;}
    }

    removeAccess() {
        const employeesWithoutAccess = this.DocumentService.grantAccess(this.selectedEmployeeWithAccess, this.employeesWithAccess, this.employeesWithoutAccess);
        if(employeesWithoutAccess) {this.employeesWithoutAccess = employeesWithoutAccess;}
    }
}
