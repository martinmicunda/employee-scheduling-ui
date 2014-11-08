/**
 * @ngInject
 */
export default function employeesRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('employees', {
            url: '/employees',
            templateUrl: 'app/states/employees/employees.html'
        });
}

