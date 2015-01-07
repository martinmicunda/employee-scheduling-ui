/**
 * @ngInject
 */
function bankDetailsRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('employees.edit.bank-details', {
            url: '/bank-details',
            views: {
                'modal@': {
                    templateUrl: 'app/states/employees/edit/bank-details/bank-details.html'
                }
            }
        });
}

export default bankDetailsRoute;
