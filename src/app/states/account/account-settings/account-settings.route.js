/**
 * @ngInject
 */
export default function accountSettingsRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('account.account-settings', {
            url: '/account-settings',
            templateUrl: 'app/states/account/account-settings/account-settings.html'
        });
}
