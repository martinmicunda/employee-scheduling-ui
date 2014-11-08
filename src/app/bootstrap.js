/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
//import 'traceur-runtime';
import 'angular';
import './app';

angular.element(document).ready(function () {
    'use strict';
    // everything is loaded...go and bootstrap angular app!
    angular.bootstrap(document, ['app'], {
        //strictDi: true
    });
});
