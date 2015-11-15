/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './employee.mock.js#?ENV|mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'EmployeeResource'
})
@Inject('$http')
//end-non-standard
class EmployeeResource extends AbstractResource {
    constructor($http) {
        super($http, 'employees');
    }

    getEmployeeByEmail(email) {
        return this.http.get(`/${this.route}/${email}/unique`);
    }

    getAccountDetails(id) {
        return this.http.get(`/${this.route}/${id}/account`);
    }

    updateAccountDetails(updatedResource) {
        return this.http.put(`/${this.route}/${updatedResource.id}/account`, updatedResource);
    }
}

export default EmployeeResource;
