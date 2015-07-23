/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './edit.html!text';
import {ROLE} from '../../../../core/constants/constants';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$state', '$modal', ($stateParams, $state, $modal) => {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            controller: DocumentEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                document: ['DocumentResource', (DocumentResource) => DocumentResource.get(id)],
                employees: ['EmployeeResource', EmployeeResource => EmployeeResource.getList()]
            }
        }).result.then(() => {
            }, (error) => {
                if(error.status) {
                    $modal.open({
                        template: '<mm-error-modal cancel="vm.cancel()" error="vm.error"></mm-error-modal>',
                        controller: ['$modalInstance', function ($modalInstance) {
                            var vm = this;
                            vm.error = error;
                            vm.cancel = () => $modalInstance.dismiss('cancel');
                        }],
                        controllerAs: 'vm',
                        size: 'md'
                    }).result.finally(() => $state.go('app.documents'));
                }
            }).finally(() => $state.go('app.documents'));
    }]
})
@Inject('document', 'employees', '$modalInstance', 'FormService', 'DocumentService')
//end-non-standard
class DocumentEdit {
    constructor(document, employees, $modalInstance, FormService, DocumentService) {
        this.document = document;
        this.employeesWithoutAccess = employees.filter((employee) => employee.role !== ROLE.MANAGER && employee.role !== ROLE.ADMIN && document.employees.filter((emp) => emp === employee.id).length === 0);
        this.employeesWithAccess = employees.filter((employee) => document.employees.filter((emp) => emp === employee.id).length > 0);
        this.selectedEmployeeWithoutAccess = [];
        this.selectedEmployeeWithAccess = [];
        this.$modalInstance = $modalInstance;
        this.DocumentService = DocumentService;
        this.FormService = FormService;
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.document.employees = [];
        if(this.document.isLocked) {
            this.employeesWithAccess.forEach(employee => this.document.employees.push(employee.id));
        }
        this.document.put().then(() => {
            this.DocumentService.update(this.document);
            this.FormService.success(this);
        }, (response) => {
            this.FormService.failure(this, response);
        }).finally(() => {
            form.$setPristine();
        });
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
