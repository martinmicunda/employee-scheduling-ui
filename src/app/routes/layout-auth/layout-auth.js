/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './login/login';
import template from './layout-auth.html!text';
import {RouteConfig} from '../../ng-decorator'; // jshint unused: false

//start-non-standard
@RouteConfig('auth', {
    url: '',
    abstract: true,
    template: template
})
//end-non-standard
class LayoutAuthState {}

