/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './reset-password.html!text';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('auth.reset-password', {
    url: '/reset-password/:token',
    template: '<reset-password></reset-password>'
})
@Component({
    selector: 'reset-password'
})
@View({
    template: template
})
@Inject('$state', '$rootScope', '$timeout', 'AuthenticationResource', 'FormService', 'TokenModel')
//end-non-standard
class ResetPassword {
    constructor($state, $rootScope, $timeout, AuthenticationResource, FormService, TokenModel) {
        this.router = $state;
        this.$timeout = $timeout;
        this.$rootScope = $rootScope;
        this.result = null;
        this.isSubmitting = null;
        this.copyrightDate = new Date();
        this.saveButtonOptions = Object.assign({}, FormService.getModalSaveButtonOptions());
        this.saveButtonOptions.buttonDefaultText = 'Set a New Password';
        this.saveButtonOptions.buttonSubmittingText = 'Setting a New Password';
        this.saveButtonOptions.buttonSuccessText = 'Set a New Password';
        this.AuthenticationResource = AuthenticationResource;
        this.FormService = FormService;
        this.TokenModel = TokenModel;
    }

    resetPassword(isFormValid, form) {
        if(!isFormValid) {return;}

        this.isSubmitting = true;
        const credentials = {password: this.password};
        return this.AuthenticationResource.resetPassword(credentials, this.router.params.token).then((data) => {
            this.TokenModel.set(data.token);
            this.$rootScope.currentUser = this.TokenModel.getCurrentUser();
            this.hasSuccess = true;
            this.successMessage = 'Your password has been changed, and you have been logged into your account. You will be redirected back to the site in 5 seconds.';
            form.$setPristine();
            this.FormService.onSuccess(this);
            this.$timeout(() => this.router.go('app.schedule'), 5000);
        }, (response) => {
            this.hasSuccess = false;
            form.$setPristine();
            this.FormService.onFailure(this, response);
        });
    }
}

export default ResetPassword;
