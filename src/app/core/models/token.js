/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'TokenModel'
})
@Inject('$window', 'localStorageService')
//end-non-standard
class TokenModel {
    constructor($window, localStorageService) {
        this.window = $window;
        this.cachedToken = null;
        this.tokenStorageKey = 'token';
        this.cachedCurrentUser = null;
        this.currentUserStorageKey = 'user';
        this.localStorageService = localStorageService;
    }

    set(token) {
        this.cachedToken = token;
        this.localStorageService.set(this.tokenStorageKey, token);

        // decode user data from payload token
        this.cachedCurrentUser = this.decode(token);
        this.localStorageService.set(this.currentUserStorageKey, this.cachedCurrentUser);
    }

    get() {
        if (!this.cachedToken) {
            this.cachedToken = this.localStorageService.get(this.tokenStorageKey);
        }
        return this.cachedToken;
    }

    getCurrentUser() {
        return this.cachedCurrentUser || this.localStorageService.get(this.currentUserStorageKey);
    }

    remove() {
        this.cachedToken = null;
        this.localStorageService.remove(this.tokenStorageKey);

        this.cachedCurrentUser = null;
        this.localStorageService.remove(this.currentUserStorageKey);
    }

    decode(token) {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }

        // get payload part of token that contains user data (Token look like xxxxxxxxxxx.yyyy.zzzzzzzzzzzz the y is the encoded payload.)
        const encoded = parts[1];

        // decode user data from payload token
        const decoded = this.window.atob(encoded);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }

        return JSON.parse(decoded);
    }
}

export default TokenModel;
