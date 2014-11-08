/**
 * @ngInject
 */
export default function settingsRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('settings', {
            url: '/settings',
            templateUrl: 'app/settings/settings.html'
        });
}


