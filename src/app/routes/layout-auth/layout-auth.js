/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './login/login';
import './activate-account/activate-account';
import './forgot-password/forgot-password';
import './reset-password/reset-password';
import {ACCESS_LEVELS} from '../../core/constants/constants';
import template from './layout-auth.html!text';
import {RouteConfig} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('auth', {
    url: '',
    abstract: true,
    template: template,
    data: {
        access: ACCESS_LEVELS.public
    }
})
//end-non-standard
class LayoutAuth {}
