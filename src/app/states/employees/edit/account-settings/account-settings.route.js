/**
 * @ngInject
 */
function accountSettingsRoute($stateProvider) {
    'use strict';

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
export default accountSettingsRoute;
