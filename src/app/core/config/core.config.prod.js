(function () {
    'use strict';

    angular
        .module('app.core')
        .constant('env', {
            name: 'prod',
            apiVersion: '1.0'
        })/* @ngInject */
        .config(function ($compileProvider, $httpProvider) {
            // disabling debug data to get better performance gain in production
            $compileProvider.debugInfoEnabled(false);
            // configure $http service to combine processing of multiple http responses received at
            // around the same time via $rootScope.$applyAsync to get better performance gain in production
            $httpProvider.useApplyAsync(true);
        });
})();
