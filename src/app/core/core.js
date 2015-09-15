/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// config
import './config/config';

// helpers
import './helpers/position-label';

// interceptors
import './interceptors/api-url-http';

// models
import './models/document';
import './models/location';
import './models/modal';
import './models/partner';
import './models/position';
import './models/setting';
import './models/employee';
import './models/language';
import './models/currency';

// resources
import './resources/employee/employee';
import './resources/language/language';
import './resources/location/location';
import './resources/partner/partner';
import './resources/setting/setting';
import './resources/position/position';
import './resources/document/document';
import './resources/currency/currency';
// http://snippetrepo.com/snippets/angularjs-http-rest-service-abstraction
// https://medium.com/@tomastrajan/model-pattern-for-angular-js-67494389d6f
// http://blog.jonparrott.com/angular-writing-list-controllers-the-easy-way/ TODO: move away from restangular and instead of create resources with $http (loading lodash is overkill for this project)
// also add code to abstract resource where I initilize version of endpoint as I can have different version for each endpoint e.g. microservices styles. The default should be v1 and extends class should have option overwrite version number e.g. v2

// services
import './services/document';
import './services/form';
import './services/modal';
