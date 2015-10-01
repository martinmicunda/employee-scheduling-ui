/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './login.html!text';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('auth.login', {
    url: '/',
    template: '<login></login>'
})
@Component({
    selector: 'login'
})
@View({
    template: template
})
@Inject('$rootScope', '$state', 'AuthenticationService', 'FormService')
//end-non-standard
class Login {
    constructor($rootScope, $state, AuthenticationService, FormService) {
        this.$rootScope = $rootScope;
        this.router = $state;
        this.result = null;
        this.isSubmitting = null;
        this.saveButtonOptions = Object.assign({}, FormService.getSaveButtonOptions());
        this.saveButtonOptions.buttonDefaultText = 'Sign me in';
        this.saveButtonOptions.buttonSubmittingText = 'Signing me in';
        this.saveButtonOptions.buttonSuccessText = 'Signed me in';
        this.AuthenticationService = AuthenticationService;
        this.FormService = FormService;
    }

    login(isFormValid) {
        if(!isFormValid) {return;}

        this.isSubmitting = true;
        return this.AuthenticationService.login(this.credentials).then(() => {
            this.$rootScope.currentUser = this.AuthenticationService.getCurrentUser();
            this.FormService.onSuccess(this);
            this.router.go('app.schedule');
        }, (response) => {
            this.FormService.onFailure(this, response);
        });
    }
    // https://stormpath.com/blog/password-security-right-way/
}

export default Login;
