(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .config(dashboardRoute);

    /**
     * @ngInject
     */
    function dashboardRoute($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                //abstract: true,
                //controller: 'UserCtrl as vm',
                templateUrl: 'app/dashboard/dashboard.html',

                //views: {
                //    '@container': {
                //        templateUrl: 'app/home/views/home.html'
                //    }
                //}
            });
    }

})();
