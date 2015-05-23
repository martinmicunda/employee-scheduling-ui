/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import PositionsController from './positions.controller';
import positionsRoute from './positions.route';

export default angular.module('app.settings.positions', [])
    .config(positionsRoute)
    .controller('PositionsController', PositionsController);

