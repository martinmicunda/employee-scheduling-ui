/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {EMPLOYEE_PROFILE_STATUSES} from '../../core/constants/constants';
import template from './modal-partner.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-partner'
})
@View({
    template: template
})
@Inject('ModalModel', 'PartnerModel', 'FormService')
//end-non-standard
class PartnerModal {
    constructor(ModalModel, PartnerModel, FormService) {
        this.modal = ModalModel.getItem();
        this.partner = PartnerModel.getItem();
        this.statusTypes = [EMPLOYEE_PROFILE_STATUSES.ACTIVE, EMPLOYEE_PROFILE_STATUSES.INACTIVE];
        this.partner.status = this.partner.status || this.statusTypes[0];
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.PartnerModel = PartnerModel;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.FormService.save(this.PartnerModel, this.partner, this, form);
    }
}

export default PartnerModal;
