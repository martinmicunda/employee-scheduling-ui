/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './employee/employee';
import './language/language';
import './location/location';
import './partner/partner';
import './role/role';
import './setting/setting';
import './position/position';
import './document/document';

// http://blog.jonparrott.com/angular-writing-list-controllers-the-easy-way/ TODO: move away from restangular and instead of create resources with $http (loading lodash is overkill for this project)
// also add code to abstract resource where I initilize version of endpoint as I can have different version for each endpoint e.g. microservices styles. The default should be v1 and extends class should have option overwrite version number e.g. v2
