'use strict';

function dashboardRoute($stateProvider) {

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            //abstract: true,
            //controller: 'UserCtrl as vm',
            templateUrl: 'app/states/dashboard/dashboard.html',

            //views: {
            //    '@container': {
            //        templateUrl: 'app/home/views/home.html'
            //    }
            //}
        });
}
dashboardRoute.$inject = ['$stateProvider'];

export default dashboardRoute;
