'use strict';

import template from './account-details.html!text';

function accountDetailsRoute($stateProvider) {

    return $stateProvider
        .state('account.account-details', {
            url: '/account-details',
            template: template
        });
}
accountDetailsRoute.$inject = ['$stateProvider'];

export default accountDetailsRoute;
