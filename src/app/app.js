/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// js vendor files
import 'fullcalendar';
import 'fullcalendar-scheduler';
import angular from 'angular';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-messages';
import 'angular-ui-router';
import 'angular-ui/ui-bootstrap-tpls';
import 'angular-local-storage';
import 'ng-bs-animated-button';
import 'angular-bootstrap-colorpicker';
import 'si-table';
import 'ng-file-upload';
import 'angular-ui-calendar';

// css vendor files
//import 'font-awesome/css/font-awesome.css!';
//import 'github:fyockm/bootstrap-css-only/css/bootstrap.css!';

// js app files
import './core/core';
import './directives/directives';
import './components/components';
import './routes/routes';
import mainModule from './ng-decorators';

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainModule.name], {
        strictDi: true
    });
});
