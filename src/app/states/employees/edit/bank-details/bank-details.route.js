'use strict';

import template from './bank-details.html!text';

function bankDetailsRoute($stateProvider) {
    'ngInject';
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

export default bankDetailsRoute;
