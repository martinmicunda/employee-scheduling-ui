(function () {
    'use strict';

    /**
     * @description
     * The http interceptor that listens for authentication failures.
     *
     * @param $q
     * @param $location
     * @param Token
     * @returns {{request: request, responseError: responseError}}
     * @constructor
     * @ngInject
     */
    function AuthenticationInterceptor($q, $location, Token) {
        return {
            request: function (config) {
                var token = Token.get();
                if (token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            responseError: function (rejection) {
                // revoke client authentication if 401 is received
                if (rejection != null && rejection.status === 401 && !!Token.get()) {
                    Token.remove();
                    $location.path("/");
                }
                return $q.reject(rejection);
            }
        };
    }

    angular
        .module('mm.authentication')
        .factory('AuthenticationInterceptor', AuthenticationInterceptor)
        .config(function ($httpProvider) {
            // we have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
            $httpProvider.interceptors.push('AuthenticationInterceptor');
        });
})();
