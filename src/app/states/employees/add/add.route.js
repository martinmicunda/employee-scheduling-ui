/**
 * @ngInject
 */
function employeesAddRoute($stateProvider) {
    'use strict';

    $stateProvider
        //http://blog.chorip.am/articles/angularsjs-ui-router-and-in-modal-nested-states/

    //http://stackoverflow.com/questions/26043295/multistep-form-using-angular-ui-router TODO: wizard validation
        .state('employees.add', {
            url: '/add',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                $modal.open({
                    templateUrl: 'app/states/employees/add/add.html',
                    resolve: {/* @ngInject */
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
                    controller: 'EmployeesAddController',
                    controllerAs: 'vm',
                    size: 'lg'
                }).result.finally(function() {
                        $state.go('employees');
                    });
            }]
        });
}

export default employeesAddRoute;

