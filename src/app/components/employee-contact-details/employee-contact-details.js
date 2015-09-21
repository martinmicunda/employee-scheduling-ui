/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './employee-contact-details.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'employee-contact-details'
})
@View({
    template: template
})
@Inject('EmployeeModel')
//end-non-standard
class EmployeeContactDetails {
    constructor(EmployeeModel) {
        this.employee = EmployeeModel.getItem();
    }
}

export default EmployeeContactDetails;
