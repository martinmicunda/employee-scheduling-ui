'use strict';

import template from './schedule.html!text';

function employeesScheduleRoute($stateProvider) {

    $stateProvider
        .state('employees.schedule', {
            url: '/:id/schedule',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                //var id = $stateParams.id;
                $modal.open({
                    template: template,
                    resolve: {/* @ngInject */
                        //employee: function(EmployeeResource) {
                        //    return EmployeeResource.get(id);
                        //}
                    },
                    controller: 'EmployeesScheduleController',
                    controllerAs: 'vm',
                    size: 'md'
                }).result.finally(function() {
                        $state.go('employees');
                    });
            }]
        });
}
employeesScheduleRoute.$inject = ['$stateProvider'];

export default employeesScheduleRoute;

