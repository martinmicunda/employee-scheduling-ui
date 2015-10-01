/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './forgot-password.html!text';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('auth.forgot-password', {
    url: '/forgot-password',
    template: '<forgot-password></forgot-password>'
})
@Component({
    selector: 'forgot-password'
})
@View({
    template: template
})
@Inject('$state', 'AuthenticationResource', 'FormService')
//end-non-standard
class ForgotPassword {
    constructor($state, AuthenticationResource, FormService) {
        this.router = $state;
        this.result = null;
        this.isSubmitting = null;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
        this.saveButtonOptions.buttonDefaultText = 'Reset password';
        this.saveButtonOptions.buttonSubmittingText = 'Resetting password';
        this.saveButtonOptions.buttonSuccessText = 'Reset password';
        this.AuthenticationResource = AuthenticationResource;
    }

    resetPassword(isFormValid, form) {
        if(!isFormValid) {return;}

        this.isSubmitting = true;
        return this.AuthenticationResource.resetPassword(this.credentials).then(() => {}).finally(() => {
            this.credentials = {};
            form.$setPristine();
            this.result = 'success';
            this.hasSuccess = true;
            this.successMessage = 'We have emailed you instructions on how to reset your password.';
        });
    }
}

export default ForgotPassword;
