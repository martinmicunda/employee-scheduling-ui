(function () {
    'use strict';

    /**
     * @ngInject
     */
    function CoreCtrl(httpRequestTracker) {
        var vm = this;

        vm.hasPendingRequests = function () {
            return httpRequestTracker.hasPendingRequests();
        };

//        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
//            if ( angular.isDefined( toState.data.pageTitle ) ) {
//                $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
//            }
//        });
//        // in route
//        data:{ pageTitle: 'What is It?' }
    }

    angular
        .module('app')
        .controller('CoreCtrl', CoreCtrl);

})();

