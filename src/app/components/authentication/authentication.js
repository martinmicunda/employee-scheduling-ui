(function () {
    'use strict';

    /**
     * @ngInject
     */
    function AuthenticationProvider(BitMaskProvider, localStorageServiceProvider) {
//        !!! rbac-bit-mask "Role-based access control"

        /**
         *
         * @type {{roles: string[], accessLevels: {public: string, anon: string[]}}}
         *
         * WARNING: Bitmask storage relies that you DO NOT change the order of your array of roles, if you need to add a new role, just append it to the end of the array.
         */
        var config = {
            /**
             * A max of 31 before the bit shift pushes the accompanying integer out of
             * the memory footprint for an integer
             */
            roles: ['public'],
            /**
             * The "*" symbol to represent access to all roles.
             * The left-hand side specifies the name of the access level, and the right-hand side
             * specifies what user roles have access to that access level. E.g. users with user role
             * user' and 'admin' have access to the access level 'user'.
             */
            accessLevels: {
                'public' : "*",
                'anon': ['public']
            },
            loginUrl: '/auth/login',
            logoutUrl: '/auth/logout'
        };
        localStorageServiceProvider.setPrefix('e-scheduling');

        this.userRoles = null;
        this.accessLevels = null;

        this.configure = function(params) {
            angular.extend(config, params);
            this.userRoles = BitMaskProvider.buildRoles(config.roles);
            this.accessLevels = BitMaskProvider.buildAccessLevels(config.accessLevels, this.userRoles);
        };

        this.$get = function($http, Token, Base64, localStorageService) {
            var userRoles = this.userRoles;
            var accessLevels = this.accessLevels;
            var currentUser = localStorageService.get('user') || { role: userRoles.public };

            return {
                login: function(params) {
                    return $http
                        .post(config.loginUrl, params)
                        .success(function(response){
                            // store token to local storage
                            Token.set(response.token);
                            // get payload part of token that contains user data (Token look like xxxxxxxxxxx.yyyy.zzzzzzzzzzzz the y is the encoded payload.)
                            var encodedUser = response.token.split('.')[1];

                            // decode user data from payload token
                            currentUser = JSON.parse(Base64.decode(encodedUser));
                            localStorageService.set('user', currentUser)
                        });
                },
                logout: function() {
                    return $http
                        .get(config.logoutUrl)
                        .then(function(){
                            Token.remove();
                        });
                },
                isAuthenticated: function() {
                    return !!Token.get();
                },
                isAuthorized: function (accessLevel, role) {
                    if(role === undefined) {
                        role = currentUser.role;
                    }
                    return this.isAuthenticated() && (accessLevel.bitMask & role.bitMask);
                },
                userRoles: userRoles,
                accessLevels: accessLevels,
                currentUser: currentUser
            }
//            self.login = function(params) {
//                return $http
//                       .post(config.loginUrl, params)
//                       .then(function(response){
//                            // store token to local storage
//                            Token.set(response.data.token);
//                            // get payload part of token that contains user data (Token look like xxxxxxxxxxx.yyyy.zzzzzzzzzzzz the y is the encoded payload.)
//                            var encodedUser = response.data.token.split('.')[1];
//
//                            // decode user data from payload token
//                            return JSON.parse(Base64.decode(encodedUser));
//                       });
//            };
//            self.logout = function() {
//                return $http
//                    .get(config.logoutUrl)
//                    .then(function(){
//                        Token.remove();
//                    });
//            };
//            self.isAuthenticated = function() {
//                return !!Token.get();
//            };
//            self.isAuthorized = function (accessLevel, role) {
//                if(role === undefined) {
//                    role = userRoles.public;
//                }
//                return self.isAuthenticated() && (accessLevel.bitMask & role.bitMask);
//            };
//
//            return self;
        };
    }

    angular
        .module('mm.authentication', [
            'mm.bitMask'
        ])
        .provider('Authentication', AuthenticationProvider);
})();
