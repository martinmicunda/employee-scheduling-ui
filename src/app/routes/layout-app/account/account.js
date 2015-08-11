/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './account-details/account-details';
import './contact-details/contact-details';
import './password/password';
import template from './account.html!text';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.account', {
    url: '/account',
    abstract: true,
    template: '<account></account>',
    resolve: {
        init: ['EmployeeModel', EmployeeModel => EmployeeModel.initItem('1')]
    }
})
@Component({
    selector: 'account'
})
@View({
    template: template
})
@Inject('EmployeeModel')
//end-non-standard
class Account {
    constructor(EmployeeModel) {
        this.employee = EmployeeModel.getItem();
        this.EmployeeModel = EmployeeModel;
        this.profileComplete = EmployeeModel.calculateProfileCompleteness();
    }
}
