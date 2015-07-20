/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './add.html!text';
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
        this.employeesWithoutAccess = employees;
        this.employeesWithAccess = [];
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
}
