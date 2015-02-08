function onConfigProd($compileProvider, $httpProvider) {
    'use strict';
    // disabling debug data to get better performance gain in production
    $compileProvider.debugInfoEnabled(false);
    // configure $http service to combine processing of multiple http responses received at
    // around the same time via $rootScope.$applyAsync to get better performance gain in production
    $httpProvider.useApplyAsync(true);
}
onConfigProd.$inject = ['$compileProvider', '$httpProvider'];

export default angular.module('app.core.prod', [])
    .config(onConfigProd);
