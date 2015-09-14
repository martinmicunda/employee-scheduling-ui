/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './message.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.message', {
    url: '/:id/message',
    onEnter: ['$stateParams', '$modal', 'ModalService', function($stateParams, $modal, ModalService) {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            resolve: {
                init: ['EmployeeModel', EmployeeModel => EmployeeModel.initItem(id)]
            },
            controller: EmployeeMessage,
            controllerAs: 'vm',
            size: 'md'
        }).result.finally(ModalService.onFinal('app.employees'));
    }]
})
@Inject('$modalInstance', 'FormService', 'EmployeeModel')
//end-non-standard
class EmployeeMessage {
    constructor($modalInstance, FormService, EmployeeModel) {
        this.email = {to: EmployeeModel.getItem().email};
        this.modal = $modalInstance;
        this.result = null;
        this.isSubmitting = null;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;

        // TODO: add email API resource
        //this.employee.put().then(() => {
        //    this.result = 'success';
        //    this.cancel();
        //}, (response) => {
        //    this.result = 'error';
        //    if(response.status === 409) {
        //        //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing');
        //    } else {
        //        //toaster.pop('error', 'Error:', 'Location could not be updated. Please try again!');
        //    }
        //});
    }
}

export default EmployeeMessage;
