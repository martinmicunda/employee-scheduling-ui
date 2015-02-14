'use strict';

import template from './edit.html!text';

function employeesEditRoute($stateProvider) {
    'ngInject';
    $stateProvider
        //http://blog.chorip.am/articles/angularsjs-ui-router-and-in-modal-nested-states/
        .state('employees.edit', {
            url: '/:id/edit',
            onEnter: function($stateParams, $state, $modal) {
                var id = $stateParams.id;
                $modal.open({
                    template: template,
                    resolve: {
                        employee: ($stateParams, EmployeeResource) => EmployeeResource.get(id),
                        languages: LanguageResource => LanguageResource.getList(),
                        positions: PositionResource => PositionResource.getList({lang: 'en'}), // TODO:(martin) language should comes from user profile
                        roles: RoleResource => RoleResource.getList({lang: 'en'}) // TODO:(martin) language should comes from user profile
                    },
                    controller: 'EmployeesEditController',
                    controllerAs: 'vm',
                    size: 'lg'
                }).result.finally(function() {
                        $state.go('employees');
                    });
            }
        });
}

export default employeesEditRoute;

