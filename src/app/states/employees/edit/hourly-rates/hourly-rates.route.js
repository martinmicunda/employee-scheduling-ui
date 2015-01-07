/**
 * @ngInject
 */
function hourlyRatesRoute($stateProvider) {
    'use strict';

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

export default hourlyRatesRoute;
