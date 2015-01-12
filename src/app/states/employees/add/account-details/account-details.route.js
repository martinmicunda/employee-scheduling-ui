'use strict';

function employeesAccountDetailsRoute($stateProvider) {

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
employeesAccountDetailsRoute.$inject = ['$stateProvider'];

export default employeesAccountDetailsRoute;
