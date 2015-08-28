/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'LocationModel'
})
@Inject('LocationResource')
//end-non-standard
class LocationModel extends AbstractModel {
    constructor(LocationResource) {
        super(LocationResource);
    }

    getDefaultLocation() {
        return super.getCollection().find(location => location.default);
    }
}

export default LocationModel;
