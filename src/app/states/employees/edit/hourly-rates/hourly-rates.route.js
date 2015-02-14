'use strict';

import template from './hourly-rates.html!text';

function hourlyRatesRoute($stateProvider) {
    'ngInject';
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

export default hourlyRatesRoute;
