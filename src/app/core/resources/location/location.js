/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './location.mock.js#?ENV|mock';
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
