'use strict';

import template from './account-details.html!text';

function accountDetailsRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('account.account-details', {
            url: '/account-details',
            template: template
        });
}

export default accountDetailsRoute;
