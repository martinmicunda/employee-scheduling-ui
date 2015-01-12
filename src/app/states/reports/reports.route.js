'use strict';

function reportsRoute($stateProvider) {

    $stateProvider
        .state('reports', {
            url: '/reports',
            templateUrl: 'app/states/reports/reports.html'
        });
}

export default reportsRoute;
