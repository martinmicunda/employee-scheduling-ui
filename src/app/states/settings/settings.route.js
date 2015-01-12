'use strict';

function settingsRoute($stateProvider) {
    $stateProvider
        .state('settings', {
            url: '/settings',
            templateUrl: 'app/settings/settings.html'
        });
}

export default settingsRoute;
