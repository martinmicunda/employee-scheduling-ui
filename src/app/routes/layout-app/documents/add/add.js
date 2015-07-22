/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './add.html!text';
import {ROLE} from '../../../../core/constants/constants';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents.add', {
    url: '/add',
    onEnter: ['$state', '$modal', ($state, $modal) => {
        $modal.open({
            template: template,
            controller: DocumentAdd,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                employees: ['EmployeeResource', EmployeeResource => EmployeeResource.getList()],
            }
        }).result.finally(() => $state.go('app.documents'));
    }]
})
@Inject('employees', '$modalInstance', 'DocumentResource', 'FormService', 'DocumentService')
//end-non-standard
class DocumentAdd {
    constructor(employees, $modalInstance, DocumentResource, FormService, DocumentService) {
        this.$modalInstance = $modalInstance;
        this.DocumentResource = DocumentResource;
        this.DocumentService = DocumentService;
        this.FormService = FormService;
        this.employeesWithoutAccess = employees.filter((employee) => employee.role !== ROLE.MANAGER && employee.role !== ROLE.ADMIN);
        this.employeesWithAccess = [];
        this.lock = false;
        this.selectedEmployeeWithoutAccess = [];
        this.selectedEmployeeWithAccess = [];
        this.document = {};
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
        if(this.employeesWithAccess.length > 0) {
            this.document.employees = [];
            this.employeesWithAccess.forEach(employee => this.document.employees.push(employee.id));
        }
        this.DocumentResource.create(this.document).then((document) => {
            this.document.id = document.id;
            this.DocumentService.addDocument(this.document);
            this.FormService.success(this);
        }, (response) => {
            this.FormService.failure(this, response);
        }).finally(() => {
            form.$setPristine();
        });
    }

    addAccess() {
        if(this.selectedEmployeeWithoutAccess.length > 0) {
            const selectedEmployeeWithoutAccessTemp = this.employeesWithoutAccess
                    .filter((employee) => this.selectedEmployeeWithoutAccess.filter((emp) => emp === employee.id).length > 0);

            this.employeesWithAccess = this.employeesWithAccess.concat(selectedEmployeeWithoutAccessTemp);

            selectedEmployeeWithoutAccessTemp.forEach((employee) => {
                const index = this.employeesWithoutAccess.findIndex(employeeWithoutAccess => employee.id === employeeWithoutAccess.id);
                this.employeesWithoutAccess.splice(index, 1);
            });

            this.selectedEmployeeWithoutAccess = [];
        }
    }

    removeAccess() {
        if(this.selectedEmployeeWithAccess.length > 0) {
            const selectedEmployeeWithAccessTemp = this.employeesWithAccess
                .filter((employee) => this.selectedEmployeeWithAccess.filter((emp) => emp === employee.id).length > 0);

            this.employeesWithoutAccess = this.employeesWithoutAccess.concat(selectedEmployeeWithAccessTemp);

            selectedEmployeeWithAccessTemp.forEach((employee) => {
                const index = this.employeesWithAccess.findIndex(employeeWithAccess => employee.id === employeeWithAccess.id);
                this.employeesWithAccess.splice(index, 1);
            });

            this.selectedEmployeeWithAccess = [];
        }
    }
}
