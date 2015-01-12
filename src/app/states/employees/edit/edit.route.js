'use strict';

function employeesEditRoute($stateProvider) {

    $stateProvider
        //http://blog.chorip.am/articles/angularsjs-ui-router-and-in-modal-nested-states/
        .state('employees.edit', {
            url: '/:id/edit',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                var id = $stateParams.id;
                $modal.open({
                    templateUrl: 'app/states/employees/edit/edit.html',
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
            }]
        });
}
employeesEditRoute.$inject = ['$stateProvider'];

export default employeesEditRoute;

