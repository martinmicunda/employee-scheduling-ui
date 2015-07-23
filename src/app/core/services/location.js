/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import StorageService from './storage';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'LocationService'
})
//end-non-standard
class LocationService extends StorageService {
    constructor() {
        super([]);
    }

    getDefaultLocation() {
        return super.getList().find(location => location.default);
    }
}
