/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

const PROMISE = new WeakMap();
const EMPLOYEE_MODEL = new WeakMap();
const EMPLOYEE_RESOURCE = new WeakMap();
//start-non-standard
@Directive({
    selector: 'mm-unique-email-validator'
})
//end-non-standard
class MmUniqueEmailValidator {
    constructor($q, EmployeeModel, EmployeeResource) {
        this.require ='ngModel';
        this.restrict = 'A';
        PROMISE.set(this, $q);
        EMPLOYEE_MODEL.set(this, EmployeeModel);
        EMPLOYEE_RESOURCE.set(this, EmployeeResource);
    }

    link(scope, element, attrs, ngModel) {
        const currentEmail = EMPLOYEE_MODEL.get(MmUniqueEmailValidator.instance).getItem().email;
        ngModel.$asyncValidators.unique = function(modelValue, viewValue) {
            let email = modelValue || viewValue, deferred = PROMISE.get(MmUniqueEmailValidator.instance).defer();

            if(currentEmail !== email) {
                EMPLOYEE_RESOURCE.get(MmUniqueEmailValidator.instance).getEmployeeByEmail(email).then(() => {
                    // found the employee, therefore not unique
                    deferred.reject();
                }, () => {
                    // employee not found, therefore unique
                    deferred.resolve();
                });
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        };
    }

    //start-non-standard
    @Inject('$q', 'EmployeeModel', 'EmployeeResource')
    //end-non-standard
    static directiveFactory($q, EmployeeModel, EmployeeResource){
        MmUniqueEmailValidator.instance = new MmUniqueEmailValidator($q, EmployeeModel, EmployeeResource);
        return MmUniqueEmailValidator.instance;
    }
}
