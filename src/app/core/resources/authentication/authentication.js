/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// @exclude
import './authentication.mock.js#?ENV|mock';
// @endexclude
//@exec mockPath('./authentication.mock.js')
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
        return this.http.post(`/${this.route}/login`, encoded);
    }

    logout() {
        return this.http.get(`/${this.route}/logout`);
    }

    resetPassword(credentials) {
        const encoded = this.$window.btoa(JSON.stringify(credentials));
        return this.http.post(`/${this.route}/password`, encoded);
    }

    updatePassword(credentials) {
        const encoded = this.$window.btoa(JSON.stringify(credentials));
        return this.http.put(`/${this.route}/password`, encoded);
    }
}

export default AuthenticationResource;
