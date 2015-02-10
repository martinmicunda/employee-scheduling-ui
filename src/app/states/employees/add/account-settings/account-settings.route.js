'use strict';

import template from './account-settings.html!text';

function employeesAccountSettingsRoute($stateProvider) {

    return $stateProvider
        .state('employees.add.account-settings', {
            url: '/account-settings',
            views: {
                'modal@': {
                    template: template
                }
            }
        });
}
employeesAccountSettingsRoute.$inject = ['$stateProvider'];

export default employeesAccountSettingsRoute;
