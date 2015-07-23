/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './add.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.partners.add', {
    url: '/add',
    onEnter: ['$state', '$modal', ($state, $modal) => {
        $modal.open({
            template: template,
            controller: PartnerAdd,
            controllerAs: 'vm',
            size: 'md'
        }).result.finally(() => $state.go('app.partners'));
    }]
})
@Inject('$modalInstance', 'PartnerResource', 'FormService', 'PartnerService')
//end-non-standard
class PartnerAdd {
    constructor($modalInstance, PartnerResource, FormService, PartnerService) {
        this.$modalInstance = $modalInstance;
        this.PartnerResource = PartnerResource;
        this.PartnerService = PartnerService;
        this.FormService = FormService;
        this.partner = {};
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
        this.partner.status = 'active';
        this.PartnerResource.create(this.partner).then((partner) => {
            this.partner.id = partner.id;
            this.PartnerService.add(this.partner);
            this.FormService.success(this);
        }, (response) => {
            this.FormService.failure(this, response);
        }).finally(() => {
            form.$setPristine();
        });
    }
}
