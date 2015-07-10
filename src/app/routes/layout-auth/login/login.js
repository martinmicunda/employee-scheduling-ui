/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './login.html!text';
import {RouteConfig, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('auth.login', {
    url: '/login',
    template: template
})
@Inject('$state')
//end-non-standard
class Login {
    constructor($state) {
        this.router = $state;
    }

    login() {
        this.router.go('app.employees');
    }
    // https://stormpath.com/blog/password-security-right-way/
}

