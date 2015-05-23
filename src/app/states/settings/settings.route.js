'use strict';

import template from './settings.html!text';

function settingsRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('settings', {
            url: '/settings',
            abstract: true,
            template: template
        });
}

export default settingsRoute;
