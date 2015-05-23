/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import template from './locations.html!text';

function locationRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('settings.locations', {
            url: '/locations',
            template: template,
            controller: 'LocationsController as vm',
            resolve: {
                locations: LocationResource => LocationResource.getList()
            }
        });
}

export default locationRoute;
