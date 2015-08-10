/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './contact-details.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account.contact-details', {
    url: '/contact-details',
    template: '<contact-details></contact-details>'
})
@Component({
    selector: 'contact-details'
})
@View({
    template: template
})
@Inject('EmployeeModel')
//end-non-standard
class ContactDetails {
    constructor(EmployeeModel) {
        this.employee = EmployeeModel.getItem();
    }
}
