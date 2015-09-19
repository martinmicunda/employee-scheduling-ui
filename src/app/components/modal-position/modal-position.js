/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './modal-position.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-position'
})
@View({
    template: template
})
@Inject('ModalModel', 'PositionModel', 'FormService')
//end-non-standard
class PositionModal {
    constructor(ModalModel, PositionModel, FormService) {
        this.modal = ModalModel.getItem();
        this.position = PositionModel.getItem();
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.PositionModel = PositionModel;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.FormService.save(this.PositionModel, this.position, this, form);
    }
}

export default PositionModal;
