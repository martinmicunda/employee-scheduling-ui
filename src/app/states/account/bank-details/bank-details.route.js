'use strict';

import template from './bank-details.html!text';

function bankDetailsRoute($stateProvider) {
    return $stateProvider
        .state('account.bank-details', {
            url: '/bank-details',
            template: template
        });
}
bankDetailsRoute.$inject = ['$stateProvider'];

export default bankDetailsRoute;
