/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './authentication.mock.js#?ENV|mock';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'AuthenticationResource'
})
@Inject('$http', '$window')
//end-non-standard
class AuthenticationResource {
    constructor($http, $window) {
        this.http = $http;
        this.route = 'auth';
        this.$window = $window;
    }

    login(credentials) {
        const encoded = this.$window.btoa(JSON.stringify(credentials));
        return this.http.post(`/${this.route}/login`, {credentials: encoded});
    }

    logout() {
        return this.http.get(`/${this.route}/logout`);
    }

    forgotPassword(email) {
        return this.http.post(`/${this.route}/forgot`, {email: email});
    }

    resetPassword(credentials, token) {
        const encoded = this.$window.btoa(JSON.stringify(credentials));
        return this.http.post(`/${this.route}/password/${token}`, {credentials: encoded});
    }

    updatePassword(credentials, id) {
        const encoded = this.$window.btoa(JSON.stringify(credentials));
        return this.http.put(`/${this.route}/password/${id}`, {credentials: encoded});
    }
}

export default AuthenticationResource;
