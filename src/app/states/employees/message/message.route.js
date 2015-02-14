'use strict';

import template from './message.html!text';

function employeesMessageRoute($stateProvider) {
    'ngInject';
    $stateProvider
        .state('employees.message', {
            url: '/:id/message',
            onEnter: function($stateParams, $state, $modal) {
                var id = $stateParams.id;
                $modal.open({
                    template: template,
                    resolve: {
                        employee: EmployeeResource => EmployeeResource.get(id)
                    },
                    controller: 'EmployeesMessageController',
                    controllerAs: 'vm',
                    size: 'md'
                }).result.finally(function() {
                        $state.go('employees');
                    });
            }
        });
}

export default employeesMessageRoute;

