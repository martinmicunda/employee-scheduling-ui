/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import LocationsController from './locations.controller';
import locationsRoute from './locations.route';

export default angular.module('app.settings.locations', [])
    .config(locationsRoute)
    .controller('LocationsController', LocationsController);
