'use strict';

import template from './customers.html!text';

function customersRoute($stateProvider) {

    $stateProvider
        .state('customers', {
            url: '/customers',
            template: template
        });
}
customersRoute.$inject = ['$stateProvider'];

export default customersRoute;
