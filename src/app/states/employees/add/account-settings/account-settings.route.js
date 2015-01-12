'use strict';

function employeesAccountSettingsRoute($stateProvider) {

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
employeesAccountSettingsRoute.$inject = ['$stateProvider'];

export default employeesAccountSettingsRoute;
