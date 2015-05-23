/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import template from './positions.html!text';

function positionRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('settings.positions', {
            url: '/positions',
            template: template,
            controller: 'PositionsController as vm',
            resolve: {
                positions: PositionResource => PositionResource.getList({lang: 'en'}) // TODO:(martin) language should comes from user profile
            }
        });
}

export default positionRoute;

