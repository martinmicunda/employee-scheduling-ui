/**
 * @ngInject
 */
function employeesAccountDetailsRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('employees.edit.account-details', {
            url: '/account-details',
            views: {
                'modal@': {
                    templateUrl: 'app/states/employees/edit/account-details/account-details.html'
                }
            }
        });
}

export default employeesAccountDetailsRoute;
