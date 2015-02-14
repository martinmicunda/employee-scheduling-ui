'use strict';

import template from './settings.html!text';

function settingsRoute($stateProvider) {
    'ngInject';
    $stateProvider
        .state('settings', {
            url: '/settings',
            template: template
        });
}

export default settingsRoute;
