/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './location.mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'LocationResource'
})
@Inject('Restangular')
//end-non-standard
class LocationResource extends AbstractResource {
    constructor(Restangular) {
        super(Restangular, 'locations');
    }
}
