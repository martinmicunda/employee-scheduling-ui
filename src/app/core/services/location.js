/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'LocationService'
})
//end-non-standard
class LocationService {
    constructor() {
        this.locations = [];
    }

    getLocations() {
        return this.locations;
    }

    setLocations(locations) {
        this.locations = locations;
    }

    addLocation(location) {
        this.locations.push(location);
    }

    updateLocation(location) {
        for (let i = 0; i < this.locations.length; i++) {
            if(this.locations[i].id === location.id) {
                this.locations[i] = location;
            }
        }
    }

    getDefaultLocation() {
        return this.locations.find(location => location.default);
    }
}
