'use strict';

import template from './account-settings.html!text';

function accountSettingsRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('account.account-settings', {
            url: '/account-settings',
            template: template
        });
}

export default accountSettingsRoute;
