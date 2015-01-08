/**
 * @ngInject
 */
function employeesAddRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('employees.message', {
            url: '/:id/message',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                var id = $stateParams.id;
                $modal.open({
                    templateUrl: 'app/states/employees/message/message.html',
                    resolve: {/* @ngInject */
                        employee: function(EmployeeResource) {
                            return EmployeeResource.get(id);
                        }
                    },
                    controller: 'EmployeesMessageController',
                    controllerAs: 'vm',
                    size: 'md'
                }).result.finally(function() {
                        $state.go('employees');
                    });
            }]
        });
}

export default employeesAddRoute;

