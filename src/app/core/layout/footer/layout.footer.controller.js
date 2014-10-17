(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('FooterController', FooterController);

    /**
     * @ngdoc controller
     * @name locationManager.core.controller:FooterController
     * @description
     *
     * Controller of the footer page:
     *
     * @ngInject
     */
    function FooterController() {
        var vm = this;

        angular.extend(vm, {
            copyrightDate: new Date()
        });
    }

})();
