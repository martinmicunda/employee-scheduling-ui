(function () {
    'use strict';

    /**
     * @ngdoc service
     * @name Token
     * @module mm.authentication
     * @requires localStorageService // TODO: create your own implementation of local storage
     *
     * @description
     * The `Token` service store token to local storage, cookie or memory.
     *
     * @ngInject
     */
    function Token(localStorageService) {
        /**
         * @type {string}
         * @private
         */
        var _tokenStorageKey = 'token';
        /**
         * @type {string}
         * @private
         */
        var _cachedToken = '';
        /**
         * @ngdoc method
         * @name Token#set
         * @description Set token.
         * @param {string} token
         */
        this.set = function(token) {
            _cachedToken = token;
            localStorageService.set(_tokenStorageKey, token)
        };
        /**
         * @ngdoc method
         * @name Token#get
         * @description Get token.
         * @returns {string} token
         */
        this.get = function() {
            if (!_cachedToken) {
                _cachedToken = localStorageService.get(_tokenStorageKey);
            }
            return _cachedToken;
        };
        /**
         * @ngdoc method
         * @name Token#remove
         * @description Remove token.
         */
        this.remove = function() {
            _cachedToken = null;
            localStorageService.remove(_tokenStorageKey);
        };
    }

    angular
        .module('mm.authentication')
        .service('Token', Token);
})();
// TODO: good example for different storages
//// Expose the UserApp API
//userappModule.value('UserApp', UserApp);
//
///**
// * Token storage, default is in a cookie. The PhoneGap integration will override this
// * to store the token in localStorage instead.
// */
//    UserApp.tokenStorage || (UserApp.tokenStorage = {
//    get: function() {
//        return Cookies.get('ua_session_token');
//    },
//    set: function(token) {
//        Cookies.set('ua_session_token', token, { expires: new Date(new Date().getTime() + 31536000000) });
//    },
//    remove: function() {
//        Cookies.expire('ua_session_token');
//    }
//});
