(function () {
    'use strict';

    /**
     * @ngInject
     */
    function coreRoutes($stateProvider, ACCESS_LEVELS) {
        $stateProvider
            .state('app', {
                abstract: true,
                templateUrl: 'app/core/views/main.html',
                controller: 'CoreCtrl as vm',
                data: {
                    access: ACCESS_LEVELS.user
                }
            });
    }

    angular
        .module('app')
        .config(coreRoutes);

})();
