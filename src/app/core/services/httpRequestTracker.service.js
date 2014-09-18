(function() {
    'use strict';

    /**
     * @ngInject
     */
    function httpRequestTracker($http) {
        var httpRequestTracker = {};
        httpRequestTracker.hasPendingRequests = function() {
            return $http.pendingRequests.length > 0;
        };

        return httpRequestTracker;
    }

    angular
        .module('app')
        .factory('httpRequestTracker', httpRequestTracker);

})();
