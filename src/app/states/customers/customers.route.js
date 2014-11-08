/**
 * @ngInject
 */
export default function customersRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('customers', {
            url: '/customers',
            templateUrl: 'app/states/customers/customers.html'
        });
}
