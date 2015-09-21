/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './employee-hourly-rate.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'employee-hourly-rate'
})
@View({
    template: template
})
@Inject('EmployeeModel', 'SettingModel')
//end-non-standard
class EmployeeHourlyRate {
    constructor(EmployeeModel, SettingModel) {
        this.employee = EmployeeModel.getItem();
        this.employee.currencyCode = this.employee.currencyCode || SettingModel.getItem().currencyCode;
        this.employee.currencySymbol = this.employee.currencySymbol || SettingModel.getItem().currencySymbol;
    }
}

export default EmployeeHourlyRate;
