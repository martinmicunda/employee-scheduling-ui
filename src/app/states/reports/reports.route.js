/**
 * @ngInject
 */
export default function reportsRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('reports', {
            url: '/reports',
            templateUrl: 'app/states/reports/reports.html'
        });
}
