'use strict';

import template from './reports.html!text';

function reportsRoute($stateProvider) {
    'ngInject';
    $stateProvider
        .state('reports', {
            url: '/reports',
            template: template
        });
}

export default reportsRoute;
