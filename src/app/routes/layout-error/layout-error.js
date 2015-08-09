/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import templateError from './500.html!text';
import templateNotFound from './404.html!text';
import templateUnauthorized from './403.html!text';
import {RouteConfig, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('404', {
    url: '/404',
    template: templateNotFound
})
@RouteConfig('403', {
    url: '/403',
    template: templateUnauthorized
})
@RouteConfig('500', {
    url: '/500',
    template: templateError
})
@Inject('error')
//end-non-standard
class Error {}
