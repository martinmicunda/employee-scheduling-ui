/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './edit.html!text';
import {RouteConfig, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.locations.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$state', '$modal', ($stateParams, $state, $modal) => {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            controller: LocationEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                location: ['LocationResource', (LocationResource) => LocationResource.get(id)]
            }
        }).result.then(() => {
            }, (error) => {
                if(error.status) {
                    $modal.open({
                        template: '<mm-error-modal cancel="vm.cancel()" error="vm.error"></mm-error-modal>',
                        controller: ['$modalInstance', function ($modalInstance) {
                            var vm = this;
                            vm.error = error;
                            vm.cancel = () => $modalInstance.dismiss('cancel');
                        }],
                        controllerAs: 'vm',
                        size: 'md'
                    }).result.finally(() => $state.go('app.settings.locations'));
                }
            }).finally(() => $state.go('app.settings.locations'));
    }]
})
@Inject('location', '$modalInstance', 'FormService', 'LocationService')
//end-non-standard
class LocationEdit {
    constructor(location, $modalInstance, FormService, LocationService) {
        this.location = location;
        this.statusTypes = ['active', 'inactive'];
        this.isDefaultLocation = location.default;
        this.$modalInstance = $modalInstance;
        this.LocationService = LocationService;
        this.FormService = FormService;
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
        if(this.location.default && !this.isDefaultLocation) {
            let defaultLocation = this.LocationService.getDefaultLocation();
            defaultLocation.default = false;
            // TODO: (martin) should I try to do bulk update?
            this.location.put().then(() => {
                defaultLocation.put().then(() => {
                    this.LocationService.updateLocation(this.location);
                    this.LocationService.updateLocation(defaultLocation);
                    this.FormService.success(this);
                }, (response) => {
                    this.FormService.failure(this, response);
                }).finally(() => {
                    form.$setPristine();
                });
            }, (response) => {
                this.FormService.failure(this, response);
            });
        } else {
            this.location.put().then(() => {
                this.LocationService.updateLocation(this.location);
                this.FormService.success(this);
            }, (response) => {
                this.FormService.failure(this, response);
            }).finally(() => {
                form.$setPristine();
            });
        }
    }
}
