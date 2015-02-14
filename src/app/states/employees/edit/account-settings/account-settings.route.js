'use strict';

import template from './account-settings.html!text';

function accountSettingsRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('employees.edit.account-settings', {
            url: '/account-settings',
            views: {
                'modal@': {
                    template: template
                }
            }
        });
}

export default accountSettingsRoute;
