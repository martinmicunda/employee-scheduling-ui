/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'EmployeeModel'
})
@Inject('EmployeeResource')
//end-non-standard
class EmployeeModel extends AbstractModel {
    constructor(EmployeeResource) {
        super(EmployeeResource);
    }

    emptyObjectPropertiesCounter(object) {
        let i = 0;
        for(let key in object) {
            if(object.hasOwnProperty(key) && !object[key]) {
                i++;
            }
            if(typeof object[key] === 'object') {
                i = this.emptyObjectPropertiesCounter(object[key]) + i;
            }
        }

        return i;
    }

    calculateProfileCompleteness() {
        const employee = super.getItem();
        // -3 because (employee (-employee.contactDetails - employee.bankDetails - employee.hourlyRates) - passwords)
        // employee contains 3 nested objects and we also don't count passwords fields as they are always empty
        const totalObjectProperties = (Object.keys(employee).length + Object.keys(employee.contactDetails).length + Object.keys(employee.bankDetails).length + Object.keys(employee.hourlyRates).length) - 3;
        const totalEmptyObjectProperties = this.emptyObjectPropertiesCounter(employee);

        return (((totalObjectProperties - totalEmptyObjectProperties) * 100)/ totalObjectProperties).toFixed(0);
    }
}
