/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'AuthenticationService'
})
@Inject('AuthenticationResource', 'TokenModel')
//end-non-standard
class AuthenticationService {
    constructor(AuthenticationResource, TokenModel) {
        this.TokenModel = TokenModel;
        this.AuthenticationResource = AuthenticationResource;
    }

    login(credentials) {
        return this.AuthenticationResource.login(credentials).then((response) => {
            this.TokenModel.set(response.token);
        });
    }

    logout() {
        return this.AuthenticationResource.logout().then(() => {
            this.TokenModel.remove();
        });
    }

    isAuthorized(accessLevels) {
        if(accessLevels.indexOf('*') !== -1) {
            return true;
        }
        return (this.isAuthenticated() && accessLevels.indexOf(this.getCurrentUser().role) !== -1);
    }

    isAuthenticated() {
        return !!this.TokenModel.get();
    }

    getCurrentUser() {
        return this.TokenModel.getCurrentUser();
    }
}

export default AuthenticationService;
