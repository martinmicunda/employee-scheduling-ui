'use strict';

import template from './bank-details.html!text';

function bankDetailsRoute($stateProvider) {

    return $stateProvider
        .state('employees.edit.bank-details', {
            url: '/bank-details',
            views: {
                'modal@': {
                    template: template
                }
            }
        });
}
bankDetailsRoute.$inject = ['$stateProvider'];

export default bankDetailsRoute;
