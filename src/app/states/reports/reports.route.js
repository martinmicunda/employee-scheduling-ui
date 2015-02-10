'use strict';

import template from './reports.html!text';

function reportsRoute($stateProvider) {
    $stateProvider
        .state('reports', {
            url: '/reports',
            template: template
        });
}
reportsRoute.$inject = ['$stateProvider'];

export default reportsRoute;
