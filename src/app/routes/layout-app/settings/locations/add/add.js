/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './add.html!text';
import {RouteConfig, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.locations.add', {
    url: '/add',
    onEnter: ['$state', '$modal', ($state, $modal) => {
        $modal.open({
            template: template,
            controller: LocationAdd,
            controllerAs: 'vm',
            size: 'md'
        }).result.finally(() => $state.go('app.settings.locations'));
    }]
})
@Inject('$modalInstance', 'LocationResource', 'FormService', 'LocationService')
//end-non-standard
class LocationAdd {
    constructor($modalInstance, LocationResource, FormService, LocationService) {
        this.$modalInstance = $modalInstance;
        this.LocationResource = LocationResource;
        this.LocationService = LocationService;
        this.FormService = FormService;
        this.location = {};
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.location.status = 'active';
        if(this.LocationService.getLocations().length === 0) {
            this.location.default = true;
        }
        this.LocationResource.create(this.location).then((location) => {
            this.location.id = location.id;
            this.LocationService.addLocation(this.location);
            this.FormService.success(this);
        }, (response) => {
            this.FormService.failure(this, response);
        }).finally(() => {
            form.$setPristine();
        });
    }
}
