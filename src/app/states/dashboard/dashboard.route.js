'use strict';

import template from './dashboard.html!text';

function dashboardRoute($stateProvider) {

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            //abstract: true,
            //controller: 'UserCtrl as vm',
            template: template

            //views: {
            //    '@container': {
            //        templateUrl: 'app/home/views/home.html'
            //    }
            //}
        });
}
dashboardRoute.$inject = ['$stateProvider'];

export default dashboardRoute;
