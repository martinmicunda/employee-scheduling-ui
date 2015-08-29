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

    onSuccess(self) {
        self.result = 'success';
        self.hasError = false;
        if(typeof self.cancel === 'function') {
            self.cancel();
        }
    }

    onFailure(self, response) {
        self.result = 'error';
        self.hasError = true;
        if(response.status === 404) {
            self.errorMessage = 'The requested record could not be found.';
        } else if(response.status === 409 && response.config.method === 'PUT') {
            self.errorMessage = 'Another user has updated this record while you were editing. Please reload the page and try again.';
        } else if(response.status === 409 && response.config.method === 'POST') {
            self.errorMessage = 'This record already exist.';
        } else {
            let action;
            switch(response.config.method) {
                case 'POST':
                    action = 'created';
                    break;
                case 'PUT':
                    action = 'updated';
                    break;
                case 'DELETE':
                    action = 'deleted';
                    break;
            }
            self.errorMessage = `This record could not be ${action}. Please try again.`;
        }
    }

    save(model, item, self, form) {
        return model.save(item).then(() => {
            this.onSuccess(self);
        }, (response) => {
            this.onFailure(self, response);
        }).finally(() => {
            form.$setPristine();
        });
    }

    delete(model, item, self) {
        return model.delete(item).then(() => {
            this.onSuccess(self);
        },(response) => {
            this.onFailure(self, response);
        });
    }
}

export default FormService;
