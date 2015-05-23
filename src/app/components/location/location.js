/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
import LocationResource from './location.resource';
import locationResourceMock from './location.resource.mock';

export default angular.module('app.location', [])
    .service('LocationResource', LocationResource)
    .run(locationResourceMock);
