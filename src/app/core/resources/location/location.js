/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// @exclude
import './location.mock.js#?ENV|mock';
// @endexclude
//@exec mockPath('./location.mock.js')
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'LocationResource'
})
@Inject('$http')
//end-non-standard
class LocationResource extends AbstractResource {
    constructor($http) {
        super($http, 'locations');
    }
}

export default LocationResource;
