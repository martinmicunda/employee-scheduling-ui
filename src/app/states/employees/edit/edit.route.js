/**
 * @ngInject
 */
function employeesEditRoute($stateProvider) {
    'use strict';

    $stateProvider
        //http://blog.chorip.am/articles/angularsjs-ui-router-and-in-modal-nested-states/
        .state('employees.edit', {
            url: '/:id/edit',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                var id = $stateParams.id;
                $modal.open({
                    templateUrl: 'app/states/employees/edit/edit.html',
                    resolve: {/* @ngInject */
                        employee: function($stateParams, EmployeeResource) {
                            return EmployeeResource.get(id);
                        },/* @ngInject */
                        languages: function(LanguageResource) {
                            return LanguageResource.getList();
                        },/* @ngInject */
                        positions: function(PositionResource){
                            return PositionResource.getList({lang: 'en'}); // TODO:(martin) language should comes from user profile
                        },/* @ngInject */
                        roles: function(RoleResource){
                            return RoleResource.getList({lang: 'en'}); // TODO:(martin) language should comes from user profile
                        }
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

export default employeesEditRoute;

