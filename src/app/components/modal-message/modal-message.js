/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './modal-message.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-message'
})
@View({
    template: template
})
@Inject('ModalModel', '$rootScope', 'FormService', 'EmployeeModel', 'MessageModel')
//end-non-standard
class MessageModal {
    constructor(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel) {
        this.message = {to: EmployeeModel.getItem().email, from: `${$rootScope.currentUser.firstName} ${$rootScope.currentUser.lastName}`, firstName: EmployeeModel.getItem().firstName};
        this.modal = ModalModel.getItem();
        this.result = null;
        this.isSubmitting = null;
        this.saveButtonOptions = Object.assign({}, FormService.getModalSaveButtonOptions());
        this.saveButtonOptions.buttonDefaultText = 'Send';
        this.saveButtonOptions.buttonSubmittingText = 'Sending';
        this.saveButtonOptions.buttonSuccessText = 'Sent';
        this.FormService = FormService;
        this.MessageModel = MessageModel;
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.FormService.save(this.MessageModel, this.message, this, form);
    }
}

export default MessageModal;
