/**
 * @ngInject
 */
function employeesAccountDetailsRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('employees.add.account-details', {
            url: '/account-details',
            views: {
                'modal@': {
                    templateUrl: 'app/states/employees/add/account-details/account-details.html'
                }
            }
        });
}

export default employeesAccountDetailsRoute;
