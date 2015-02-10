'use strict';

import template from './account-settings.html!text';

function accountSettingsRoute($stateProvider) {
    return $stateProvider
        .state('account.account-settings', {
            url: '/account-settings',
            template: template
        });
}
accountSettingsRoute.$inject = ['$stateProvider'];

export default accountSettingsRoute;
