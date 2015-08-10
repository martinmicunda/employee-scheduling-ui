/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './account-details.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account.account-details', {
    url: '/account-details',
    template: '<account-details></account-details>'
})
@Component({
    selector: 'account-details'
})
@View({
    template: template
})
@Inject('EmployeeModel')
//end-non-standard
class AccountDetails {
    constructor(EmployeeModel) {
        this.employee = EmployeeModel.getItem();
    }
}
