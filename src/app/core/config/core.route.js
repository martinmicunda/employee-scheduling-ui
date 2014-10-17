(function () {
    'use strict';

    /**
     * @ngInject
     */
    function coreRoutes($stateProvider) {
//        $stateProvider
//            .state('app.core', {
//                url: '',
//                //abstract: true,
//                templateUrl: 'app/core/views/main.html',
//                controller: 'CoreCtrl as vm',
////                data: {
////                    access: ACCESS_LEVELS.user
////                }
//                views: {
//                    'header@': {
//                        templateUrl: 'app/core/views/header.html'
//                    },
//                    'footer@': {
//                        templateUrl: 'app/core/views/footer.html'
//                    }
//                }
//            });
    }

    angular
        .module('app')
        .config(coreRoutes);

})();
