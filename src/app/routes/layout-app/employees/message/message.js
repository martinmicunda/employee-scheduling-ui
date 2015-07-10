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
    onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            resolve: {
                employee: ['EmployeeResource', EmployeeResource => EmployeeResource.get(id)]
            },
            controller: EmployeeMessage,
            controllerAs: 'vm',
            size: 'md'
        }).result.finally(function() {
                $state.go('app.employees');
            });
    }]
})
@Inject('employee', '$modalInstance')
//end-non-standard
class EmployeeMessage {
    constructor(employee, $modalInstance) {
        this.employee = employee;
        this.email = {to: employee.email};
        this.$modalInstance = $modalInstance;
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = {
            iconsPosition: 'right',
            buttonDefaultText: 'Send',
            buttonSubmittingText: 'Sending',
            buttonSuccessText: 'Sent',
            animationCompleteTime: '1200'
        };
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.employee.put().then(() => {
            this.result = 'success';
            this.cancel();
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
