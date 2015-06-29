/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './account-details/account-details';
import './account-settings/account-settings';
import template from './add.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorator'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.add', {
    url: '/add',
    onEnter: ['$stateParams', '$state', '$modal', ($stateParams, $state, $modal) => {
        $modal.open({
            template: template,
            resolve: {
                languages: ['LanguageResource', LanguageResource => LanguageResource.getList()],
                positions: ['PositionResource', PositionResource => PositionResource.getList({lang: 'en'})], // TODO:(martin) language should comes from user profile
                roles: ['RoleResource', RoleResource => RoleResource.getList({lang: 'en'})] // TODO:(martin) language should comes from user profile
            },
            controller: EmployeeAdd,
            controllerAs: 'vm',
            size: 'lg'
        }).result.finally(function() {
                $state.go('app.employees');
            });
    }]
})
@Inject('languages', 'positions', 'roles', 'EmployeeService', '$state', '$modalInstance')
//end-non-standard
class EmployeeAdd {
    constructor(languages, positions, roles, EmployeeService, $state, $modalInstance) {
        this.$modalInstance = $modalInstance;
        this.EmployeeResource = EmployeeService;
        this.employee = {};
        this.languages = languages;
        this.positions = positions;
        this.roles = roles;
        this.profileComplete = EmployeeService.calculateProfileCompleteness({});
        this.router = $state;
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }

    //goToNextSection (isFormValid) {
    //    // If form is valid go to next section
    //    //if(isFormValid) {
    //    //    this.$state.go(nextState(this.$state.current.name));
    //    //}
    //}
}
