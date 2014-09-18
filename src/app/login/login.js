(function () {
    'use strict';

    /**
     * @ngInject
     */
    function loginRoutes($stateProvider, ACCESS_LEVELS) {
        $stateProvider
            .state('authentication', {
                abstract: true,
                controller: 'LoginCtrl as vm',
                templateUrl: 'app/login/views/main.html',
                data: {
                    access: ACCESS_LEVELS.public
                }
            })
            .state('authentication.login', {
                url: '/',
                templateUrl: 'app/login/views/login.html'
            })
            .state('authentication.reset', {
                url: '/forgot-password',
                templateUrl: 'app/login/views/forgot-password.html'
            })
            .state('authentication.lock', {
                url: '/lock-screen',
                templateUrl: 'app/login/views/lock-screen.html'
            });
    }

    angular
        .module('app')
        .config(loginRoutes);

})();
