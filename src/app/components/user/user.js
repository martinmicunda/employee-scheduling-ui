//(function() {
//    'use strict';
//
//    /**
//     * @ngdoc filter
//     * @name role
//     * @module mm.
//     * @description
//     * Get total price for passenger type.
//     *
//     * @param {object} price the price
//     * @param {string} ptc   the passenger type
//     *
//     * @return {number} return total price for passenger type
//     *
//     * @usage
//     * <div>{{user.role | role}}</div>
//     */
//    function role() {
//        return function (role) {
//            switch (role) {
//                case 'admin':
//                    return 'Administrator';
//                case 'user':
//                    return 'Animator';
//                default:
//                    return 'Unknown';
//            }
//        };
//    }
//
//    /**
//     * @ngInject
//     */
//    function User(Restangular) {
//
//        return {
//            create: function(user) {
//                return Restangular.all('api/users').post(user);
//            }
//        };
//    }
//
//    angular
//        .module('mm.user', ['restangular'])
//        .factory('User', User)
//        .filter('role', role);
//
//})();
