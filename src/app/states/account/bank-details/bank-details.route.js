'use strict';

import template from './bank-details.html!text';

function bankDetailsRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('account.bank-details', {
            url: '/bank-details',
            template: template
        });
}

export default bankDetailsRoute;
