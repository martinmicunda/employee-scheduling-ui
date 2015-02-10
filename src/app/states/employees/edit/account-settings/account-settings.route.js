'use strict';

import template from './account-settings.html!text';

function accountSettingsRoute($stateProvider) {

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
accountSettingsRoute.$inject = ['$stateProvider'];

export default accountSettingsRoute;
