/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

const EMPLOYEE_MODEL = new WeakMap();
const EMPLOYEE_RESOURCE = new WeakMap();
//start-non-standard
@Directive({
    selector: 'mm-unique-email-validator'
})
//end-non-standard
class MmUniqueEmailValidator {
    constructor(EmployeeModel, EmployeeResource) {
        this.require ='ngModel';
        this.restrict = 'A';
        EMPLOYEE_MODEL.set(this, EmployeeModel);
        EMPLOYEE_RESOURCE.set(this, EmployeeResource);
    }

    link(scope, element, attrs, ngModel) {
        const currentEmail = EMPLOYEE_MODEL.get(MmUniqueEmailValidator.instance).getItem().email;
        ngModel.$asyncValidators.unique = (email) => {
            return new Promise((resolve, reject) => {
                if(currentEmail !== email) {
                    EMPLOYEE_RESOURCE.get(MmUniqueEmailValidator.instance).getEmployeeByEmail(email).then(() => {
                        // found the employee, therefore not unique
                        reject();
                    }, () => {
                        // employee not found, therefore unique
                        resolve();
                    });
                } else {
                    resolve();
                }
            });
        };
    }

    //start-non-standard
    @Inject('EmployeeModel', 'EmployeeResource')
    //end-non-standard
    static directiveFactory(EmployeeModel, EmployeeResource){
        MmUniqueEmailValidator.instance = new MmUniqueEmailValidator(EmployeeModel, EmployeeResource);
        return MmUniqueEmailValidator.instance;
    }
}

export default MmUniqueEmailValidator;
