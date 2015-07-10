/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'FormService'
})
//@Inject('$timeout')
//end-non-standard
class FormService {
    constructor() {
        this.saveButtonOptions = {
            iconsPosition: 'right',
            buttonDefaultText: 'Save',
            buttonSubmittingText: 'Saving',
            buttonSuccessText: 'Saved'
        };
    }

    getModalSaveButtonOptions() {
        this.saveButtonOptions.animationCompleteTime = '0';
        this.saveButtonOptions.buttonErrorClass = 'btn-success';
        return this.saveButtonOptions;
    }

    getSaveButtonOptions() {
        this.saveButtonOptions.animationCompleteTime = '1200';
        this.saveButtonOptions.buttonErrorClass = 'btn-danger';
        return this.saveButtonOptions;
    }

    modalSuccess(self) {
        self.result = 'success';
        self.cancel();
    }

    modalFailure(self, response) {
        self.result = 'error';
        self.hasError = true;
        if(response.status === 404) {
            //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing');
        } else if(response.status === 409) {
            //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing. Please reload the page and try again.');
        } else {
            //toaster.pop('error', 'Error:', 'Location could not be updated. Please try again!');
        }
    }
}
