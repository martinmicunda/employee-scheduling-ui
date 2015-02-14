'use strict';

import template from './account-settings.html!text';

function employeesAccountSettingsRoute($stateProvider) {
    'ngInject';
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

export default employeesAccountSettingsRoute;
