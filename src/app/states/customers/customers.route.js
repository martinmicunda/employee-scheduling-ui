'use strict';

function customersRoute($stateProvider) {

    $stateProvider
        .state('customers', {
            url: '/customers',
            templateUrl: 'app/states/customers/customers.html'
        });
}
customersRoute.$inject = ['$stateProvider'];

export default customersRoute;
