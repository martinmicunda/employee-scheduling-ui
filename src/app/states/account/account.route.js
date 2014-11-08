/**
 * @ngInject
 */
export default function accountRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('account', {
            url: '/account',
            templateUrl: 'app/states/account/account.html'
        });
}
