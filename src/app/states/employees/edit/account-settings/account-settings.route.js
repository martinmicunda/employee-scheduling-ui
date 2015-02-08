'use strict';

function accountSettingsRoute($stateProvider) {

    return $stateProvider
        .state('employees.edit.account-settings', {
            url: '/account-settings',
            views: {
                'modal@': {
                    templateUrl: 'app/states/employees/edit/account-settings/account-settings.html'
                }
            }
        });
}
accountSettingsRoute.$inject = ['$stateProvider'];

export default accountSettingsRoute;
