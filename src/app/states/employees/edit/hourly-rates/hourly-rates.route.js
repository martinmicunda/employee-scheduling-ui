'use strict';

function hourlyRatesRoute($stateProvider) {
    return $stateProvider
        .state('employees.edit.hourly-rates', {
            url: '/hourly-rates',
            views: {
                'modal@': {
                    templateUrl: 'app/states/employees/edit/hourly-rates/hourly-rates.html'
                }
            }
        });
}
hourlyRatesRoute.$inject = ['$stateProvider'];

export default hourlyRatesRoute;
