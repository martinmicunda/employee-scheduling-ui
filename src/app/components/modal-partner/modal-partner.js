/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

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
        this.statusTypes = ['active', 'inactive'];
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
