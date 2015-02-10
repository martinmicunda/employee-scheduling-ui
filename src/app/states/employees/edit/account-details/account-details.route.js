'use strict';

import template from './account-details.html!text';

function employeesAccountDetailsRoute($stateProvider) {

    return $stateProvider
        .state('employees.edit.account-details', {
            url: '/account-details',
            views: {
                'modal@': {
                    template: template
                }
            }
        });
}
employeesAccountDetailsRoute.$inject = ['$stateProvider'];

export default employeesAccountDetailsRoute;
