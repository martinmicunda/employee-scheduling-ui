/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './edit.html!text';
import {RouteConfig, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.positions.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$state', '$modal', ($stateParams, $state, $modal) => {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            controller: PositionEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                position: ['PositionResource', (PositionResource) => PositionResource.get(id)]
            }
        }).result.finally(function() {
                $state.go('app.settings.positions');
            });
    }]
})
@Inject('position', '$modalInstance', 'PositionResource', 'FormService', 'PositionService')
//end-non-standard
class PositionEdit {
    constructor(position, $modalInstance, PositionResource, FormService, PositionService) {
        this.position = position;
        this.$modalInstance = $modalInstance;
        this.PositionResource = PositionResource;
        this.PositionService = PositionService;
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
        this.position.put().then(() => {
            this.PositionService.updatePosition(this.position);
            this.FormService.modalSuccess(this);
        }, (response) => {
            this.FormService.modalFailure(this, response);
        }).finally(() => {
            form.$setPristine();
        });
    }
}
