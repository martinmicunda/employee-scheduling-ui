/**
 * @ngInject
 */
export default function dashboardRoute($stateProvider) {
    'use strict';

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
