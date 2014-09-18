(function () {
    'use strict';

    /**
     * @ngInject
     */
    function homeRoutes($stateProvider, ACCESS_LEVELS) {
        $stateProvider
            .state('app.home', {
                    url: '/home',
                    controller: 'UserCtrl as vm',
                    templateUrl: 'app/home/views/home.html',
                    data: {
                        access: ACCESS_LEVELS.user
                    }
                });
    }

    angular
        .module('app')
        .config(homeRoutes);

})();
