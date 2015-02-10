'use strict';

import template from './hourly-rates.html!text';

function hourlyRatesRoute($stateProvider) {
    return $stateProvider
        .state('employees.edit.hourly-rates', {
            url: '/hourly-rates',
            views: {
                'modal@': {
                    template: template
                }
            }
        });
}
hourlyRatesRoute.$inject = ['$stateProvider'];

export default hourlyRatesRoute;
