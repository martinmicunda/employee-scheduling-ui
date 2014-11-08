//(function() {
//    'use strict';
//
//    /**
//     * @ngInject
//     */
//    function httpRequestTracker($http) {
//        var httpRequestTrackerr = {};
//        httpRequestTrackerr.hasPendingRequests = function() {
//            return $http.pendingRequests.length > 0;
//        };
//
//        return httpRequestTrackerr;
//    }
//
//    angular
//        .module('app')
//        .factory('httpRequestTracker', httpRequestTracker);
//
//})();
