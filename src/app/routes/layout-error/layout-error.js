/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import templateError from './500.html!text';
import templateNotFound from './404.html!text';
import templateUnauthorized from './403.html!text';
import {ACCESS_LEVELS} from '../../core/constants/constants';
import {RouteConfig} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('403', {
    url: '/403',
    template: templateUnauthorized,
    data: {
        access: ACCESS_LEVELS.public
    }
})
@RouteConfig('404', {
    url: '/404',
    template: templateNotFound,
    data: {
        access: ACCESS_LEVELS.public
    }
})
@RouteConfig('500', {
    url: '/500',
    template: templateError,
    data: {
        access: ACCESS_LEVELS.public
    }
})
//end-non-standard
class Error {}
