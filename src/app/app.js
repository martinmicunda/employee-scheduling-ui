/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// js vendor files
import angular from 'angular';
import 'angular-animate';
import 'angular-messages';
import 'angular-ui-router';
import _ from 'lodash';
window._ = _;
import 'restangular';
import 'angular-ui/ui-bootstrap-tpls';
import 'angular-local-storage';
import 'ng-bs-animated-button';

// css vendor files
//import 'font-awesome/css/font-awesome.css!';
//import 'github:fyockm/bootstrap-css-only/css/bootstrap.css!';

// js app files
import './components/components';
import './core/core';
import './routes/routes';
import mainModule from './ng-decorators';

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainModule.name], {
        strictDi: true
    });
});

