/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './locations.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.locations', {
    url: '/locations',
    template: '<locations></locations>',
    resolve: {
        init: ['LocationModel', LocationModel => LocationModel.initCollection()]
    }
})
@Component({
    selector: 'locations'
})
@View({
    template: template
})
@Inject('FormService', 'LocationModel')
//end-non-standard
class Locations {
    constructor(FormService, LocationModel) {
        this.locations = LocationModel.getCollection();
        this.FormService = FormService;
        this.LocationModel = LocationModel;
    }

    deleteLocation(location) {
        if(location.default) {
            this.hasError = true;
            this.errorMessage = `The default location can't be deleted.`;
        } else {
            this.FormService.delete(this.LocationModel, location, this);
        }
    }
}

export default Locations;
