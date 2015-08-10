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
@Inject('EmployeeResource', 'Restangular')
//end-non-standard
class EmployeeModel extends AbstractModel {
    constructor(EmployeeResource, Restangular) {
        super(EmployeeResource);
        this.Restangular = Restangular;
    }

    objectKeys(object) {
        return Object.keys(this.Restangular.stripRestangular(object));
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

    calculateProfileCompleteness(employee) {
        employee = this.Restangular.stripRestangular(employee);
        // -3 because (employee (-employee.contactDetails - employee.bankDetails - employee.hourlyRates) - passwords)
        // employee contains 3 nested objects and we also don't count passwords fields as they are always empty
        let totalObjectProperties = (this.objectKeys(employee).length + this.objectKeys(employee.contactDetails).length + this.objectKeys(employee.bankDetails).length + this.objectKeys(employee.hourlyRates).length) - 3;
        let totalEmptyObjectProperties = this.emptyObjectPropertiesCounter(this.Restangular.stripRestangular(employee));

        return (((totalObjectProperties - totalEmptyObjectProperties) * 100)/ totalObjectProperties).toFixed(0);
    }
}
