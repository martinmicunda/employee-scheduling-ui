'use strict';

function customersRoute($stateProvider) {

    $stateProvider
        .state('customers', {
            url: '/customers',
            templateUrl: 'app/states/customers/customers.html'
        });
}

export default customersRoute;
