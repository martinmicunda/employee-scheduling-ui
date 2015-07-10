/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './account-details.html!text';
import {RouteConfig} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account.account-details', {
    url: '/account-details',
    template: template
})
//end-non-standard
class ProfileAcountDetails {}
