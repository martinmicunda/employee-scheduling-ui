/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './add.html!text';
import {RouteConfig, Inject} from '../../../../../ng-decorator'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.positions.add', {
    url: '/add',
    onEnter: ['$state', '$modal', ($state, $modal) => {
        $modal.open({
            template: template,
            controller: PositionAdd,
            controllerAs: 'vm',
            size: 'md'
        }).result.finally(function() {
                $state.go('app.settings.positions');
            });
    }]
})
@Inject('$modalInstance', 'PositionResource', 'FormService', 'PositionService')
//end-non-standard
class PositionAdd {
    constructor($modalInstance, PositionResource, FormService, PositionService) {
        this.$modalInstance = $modalInstance;
        this.PositionResource = PositionResource;
        this.PositionService = PositionService;
        this.FormService = FormService;
        this.position= {};
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
        this.PositionResource.create(this.position).then((position) => {
            this.position.id = position.id;
            this.PositionService.addPosition(this.position);
            this.FormService.modalSuccess(this);
        }, (response) => {
            this.FormService.modalFailure(this, response);
        }).finally(() => {
            form.$setPristine();
        });
    }
}
