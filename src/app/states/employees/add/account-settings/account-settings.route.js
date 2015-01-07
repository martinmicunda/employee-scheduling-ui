/**
 * @ngInject
 */
function employeesAccountSettingsRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('employees.add.account-settings', {
            url: '/account-settings',
            views: {
                'modal@': {
                    templateUrl: 'app/states/employees/add/account-settings/account-settings.html'
                }
            }
        });
}
export default employeesAccountSettingsRoute;
