(function () {
    'use strict';

    angular.module('app', [
        // angular modules
        'ngAnimate',
        'ngMessages',

        // 3rd party modules
        'restangular',
        'ui.router',
        'ui.bootstrap',
        'LocalStorageModule',

        // mm components modules
        //'mm.authentication',
        //'mm.user',
        //'mm.centered',

        // employeeScheduling component modules

        // app state (feature) modules
        'app.core',
        'app.dashboard'
    ]);

})();
