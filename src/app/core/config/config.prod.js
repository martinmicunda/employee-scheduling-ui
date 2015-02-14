function onConfigProd($compileProvider, $httpProvider) {
    'use strict';
    'ngInject';
    // disabling debug data to get better performance gain in production
    $compileProvider.debugInfoEnabled(false);
    // configure $http service to combine processing of multiple http responses received at
    // around the same time via $rootScope.$applyAsync to get better performance gain in production
    $httpProvider.useApplyAsync(true);
}

export default angular.module('app.core.prod', [])
    .config(onConfigProd);
