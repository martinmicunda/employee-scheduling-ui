'use strict';

function bankDetailsRoute($stateProvider) {

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
bankDetailsRoute.$inject = ['$stateProvider'];

export default bankDetailsRoute;
