/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './edit.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.partners.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$state', '$modal', ($stateParams, $state, $modal) => {
        const id = $stateParams.id;
        $modal.open({
            template: template,
            controller: PartnerEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                partner: ['PartnerResource', (PartnerResource) => PartnerResource.get(id)]
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
                    }).result.finally(() => $state.go('app.partners'));
                }
            }).finally(() => $state.go('app.partners'));
    }]
})
@Inject('partner', '$modalInstance', 'FormService', 'PartnerService')
//end-non-standard
class PartnerEdit {
    constructor(partner, $modalInstance, FormService, PartnerService) {
        this.partner = partner;
        this.statusTypes = ['active', 'inactive'];
        this.$modalInstance = $modalInstance;
        this.PartnerService = PartnerService;
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
        this.partner.put().then(() => {
            this.PartnerService.updatePartner(this.partner);
            this.FormService.success(this);
        }, (response) => {
            this.FormService.failure(this, response);
        }).finally(() => {
            form.$setPristine();
        });
    }
}
