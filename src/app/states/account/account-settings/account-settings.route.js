'use strict';

function accountSettingsRoute($stateProvider) {
    return $stateProvider
        .state('account.account-settings', {
            url: '/account-settings',
            templateUrl: 'app/states/account/account-settings/account-settings.html'
        });
}

export default accountSettingsRoute;
