/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './account-details/account-details';
import './account-settings/account-settings';
import './bank-details/bank-details';
import './contact-details/contact-details';
import './hourly-rates/hourly-rates';
import template from './edit.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
//http://blog.chorip.am/articles/angularsjs-ui-router-and-in-modal-nested-states/
@RouteConfig('app.employees.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$state', '$modal', ($stateParams, $state, $modal) => {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            resolve: {
                employee: ['$stateParams', 'EmployeeResource', ($stateParams, EmployeeResource) => EmployeeResource.get(id)],
                languages: ['LanguageResource', LanguageResource => LanguageResource.getList(null, true)],
                positions: ['PositionResource', PositionResource => PositionResource.getList({lang: 'en'})], // TODO:(martin) language should comes from user profile
                roles: ['RoleResource', RoleResource => RoleResource.getList({lang: 'en'}, true)] // TODO:(martin) language should comes from user profile
            },
            controller: EmployeeEdit,
            controllerAs: 'vm',
            size: 'lg'
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
                    }).result.finally(() => $state.go('app.employees'));
                }
            }).finally(() => $state.go('app.employees'));
    }]
})
@Inject('employee', 'languages', 'positions', 'roles', 'EmployeeService', '$modalInstance')
//end-non-standard
class EmployeeEdit {
    constructor(employee, languages, positions, roles, EmployeeService, $modalInstance) {
        this.$modalInstance = $modalInstance;
        this.EmployeeService = EmployeeService;
        this.employee = employee;
        this.languages = languages;
        this.positions = positions;
        this.roles = roles;
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

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.employee.put().then((employee) => {
            this.profileComplete = this.EmployeeService.calculateProfileCompleteness(this.employee);
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
// http://www.sitepoint.com/creating-stateful-modals-angularjs-angular-ui-router/
