/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'FormService'
})
@Inject('SettingModel')
//end-non-standard
class FormService {
    constructor(SettingModel) {
        this.SettingModel = SettingModel;
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
        if(response.status === 400) {
            self.errorMessage = response.data.message;
        } else if(response.status === 401) {
            self.errorMessage = 'Wrong email or password.';
        } else if(response.status === 404) {
            self.errorMessage = 'The requested record could not be found.';
        } else if(response.status === 409 && response.config.method === 'PUT') {
            self.errorMessage = 'Another user has updated this record while you were editing. Please reload the page and try again.';
        } else if(response.status === 409 && response.config.method === 'POST') {
            self.errorMessage = 'This record already exist.';
        } else if(response.status === 503) {
            self.errorMessage = 'The service went down. Please try again later.';
        } else {
            self.errorMessage = `Something went wrong. Please contact the site administrator ${this.SettingModel.getItem().adminEmail}.`;
        }
    }

    save(model, item, self, form) {
        return model.save(item).then(() => {
            this.onSuccess(self);
            return Promise.resolve();
        }, (response) => {
            this.onFailure(self, response);
            return Promise.reject(response);
        }).finally(() => {
            form.$setPristine();
        });
    }

    delete(model, item, self) {
        return model.delete(item).then(() => {
            this.onSuccess(self);
            return Promise.resolve();
        },(response) => {
            this.onFailure(self, response);
            return Promise.reject(response);
        });
    }

    submitChildForm(currentState, form, formSteps) {
        switch(currentState) {
            case formSteps[0].route:
                form[formSteps[0].formName].$submitted = true;
                formSteps[0].valid = form[formSteps[0].formName].$valid;
                break;
            case formSteps[3].route:
                form[formSteps[3].formName].$submitted = true;
                formSteps[3].valid = form[formSteps[3].formName].$valid;
                break;
        }
    }

    previousState(currentState, formSteps) {
        let previousState = null;
        switch(currentState) {
            case formSteps[5].route:
                previousState = formSteps[4].route;
                break;
            case formSteps[4].route:
                previousState = formSteps[3].route;
                break;
            case formSteps[3].route:
                previousState = formSteps[2].route;
                break;
            case formSteps[2].route:
                previousState = formSteps[1].route;
                break;
            case formSteps[1].route:
                previousState = formSteps[0].route;
                break;
        }

        return previousState;
    }

    nextState(currentState, formSteps) {
        let nextState = null;
        switch(currentState) {
            case formSteps[0].route:
                nextState = formSteps[1].route;
                break;
            case formSteps[1].route:
                nextState = formSteps[2].route;
                break;
            case formSteps[2].route:
                nextState = formSteps[3].route;
                break;
            case formSteps[3].route:
                nextState = formSteps[4].route;
                break;
            case formSteps[4].route:
                nextState = formSteps[5].route;
                break;
        }

        return nextState;
    }

    /**
     * we are using ui-router for add wizard form so there might be possibility that user can jump to 'complete' state through URL
     * so we need to make sure that child form exist
     *
     */
    hasInvalidChildForms(router, formSteps) {
        const invalidForm = formSteps.find((form) => !form.valid);
        if(invalidForm) {
            router.go(invalidForm.route);
        }

        return invalidForm;
    }
}

export default FormService;
