/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './availability.mock.js#?ENV|mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'AvailabilityResource'
})
@Inject('$http')
//end-non-standard
class AvailabilityResource extends AbstractResource {
    constructor($http) {
        super($http, 'availabilities');
    }
}

export default AvailabilityResource;
