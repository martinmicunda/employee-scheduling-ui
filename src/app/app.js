/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// js vendor files
import angular from 'angular';
import 'angular-animate';
import 'angular-ui-router';
import 'github:angular/bower-angular-messages';
import 'github:lodash/lodash';
import 'github:mgonto/restangular';
import 'github:angular-ui/bootstrap-bower/ui-bootstrap-tpls';
import 'github:grevory/angular-local-storage';
import 'github:jeremypeters/ng-bs-animated-button';

// css vendor files
//import 'font-awesome/css/font-awesome.css!';
//import 'github:fyockm/bootstrap-css-only/css/bootstrap.css!';

// js app files
import './components/components';
import './core/core';
import './routes/routes';
import ngDecorator from './ng-decorator';

const mainModule = angular.module('app', [
    ngDecorator.name
]);

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainModule.name], {
        strictDi: true
    });
});

