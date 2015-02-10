'use strict';

import template from './settings.html!text';

function settingsRoute($stateProvider) {
    $stateProvider
        .state('settings', {
            url: '/settings',
            template: template
        });
}
settingsRoute.$inject = ['$stateProvider'];

export default settingsRoute;
