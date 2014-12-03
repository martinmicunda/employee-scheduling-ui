/**
 * @ngInject
 */
function hourlyRatesRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('account.hourly-rates', {
            url: '/hourly-rates',
            templateUrl: 'app/states/account/hourly-rates/hourly-rates.html'
        });
}

export default hourlyRatesRoute;
