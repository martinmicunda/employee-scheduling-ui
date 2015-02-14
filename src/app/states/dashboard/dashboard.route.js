'use strict';

import template from './dashboard.html!text';

function dashboardRoute($stateProvider) {
    'ngInject';
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

export default dashboardRoute;
