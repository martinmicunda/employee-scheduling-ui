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
    template: templateNotFound,
    resolve: {
        error: () => {}
    }
})
@RouteConfig('403', {
    url: '/403',
    template: templateUnauthorized,
    resolve: {
        error: () => {}
    }
})
@RouteConfig('500', {
    url: '/500',
    template: templateError,
    resolve: {
        error: function() {return this.self.error} // Don't use arrow function here as for some reason 'this.self' doesn't work properly in ui-router with arrow function
    }
})
@Inject('error')
//end-non-standard
class Error {
    constructor(error) {
        this.error = error;
    }
}
