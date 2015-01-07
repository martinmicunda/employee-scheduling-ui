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
                    resolve: {
                        //item: function() { new Item(123).get(); }
                    },
                    controller: ['$modalInstance', function($modalInstance) {
                        var vm = this;

                        vm.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };
                    }],
                    controllerAs: 'vm',
                    size: 'lg'
                }).result.finally(function() {
                        $state.go('employees');
                    });
            }],
            resolve: {/* @ngInject */
                languages: function(languages) {
                    return languages;
                },/* @ngInject */
                positions: function(positions){
                    return positions;
                },/* @ngInject */
                roles: function(roles){
                    return roles;
                }
            }
        });
}

export default employeesAddRoute;

