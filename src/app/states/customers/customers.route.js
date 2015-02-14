'use strict';

import template from './customers.html!text';

function customersRoute($stateProvider) {
    'ngInject';
    $stateProvider
        .state('customers', {
            url: '/customers',
            template: template
        });
}

export default customersRoute;
