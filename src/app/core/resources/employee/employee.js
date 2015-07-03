/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './employee.mock';
import {Service, Inject} from '../../../ng-decorator'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'EmployeeResource'
})
@Inject('Restangular')
//end-non-standard
class EmployeeResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    get(id) {
        return this.Restangular
            .one('employees', id)
            .get();
    }

    getList() {
        return this.Restangular
            .all('employees')
            .getList();
    }

    delete(id) {
        return this.Restangular
            .one('employees', id)
            .remove();
    }
}

