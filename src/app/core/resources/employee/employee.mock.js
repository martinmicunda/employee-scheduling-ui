/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from './fixtures/employee_1.json!json';
import employees from './fixtures/employees.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Run()
//end-non-standard
class EmployeeResourceMock {
    constructor($httpBackend) {
        $httpBackend.whenGET(/\/employees\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                if(url.includes('employees/1')) {
                    return [200, employee];
                }
            });

        $httpBackend.whenGET(/\/employees/)
            .respond( (method, url) => {
                console.log('GET',url);
                return [200, employees];
            });

        $httpBackend.whenPUT(/\/employees/)
            .respond( (method, url, data) => {
                console.log('PUT',url);
                var dataJSON = JSON.parse(data);
                if(dataJSON.firstName === '503') {
                    return [503, dataJSON];
                } else if(dataJSON.firstName === '409') {
                    return [409, dataJSON];
                }

                // increment version number to fake real system
                dataJSON.version++;

                return [200, dataJSON];
            });

        $httpBackend.whenDELETE(/\/employees/)
            .respond( (method, url) => { // data
                console.log('DELETE',url);
                //var dataJSON = JSON.parse(data);
                //if(dataJSON.firstName[0].Value === '503') {
                //    return [503, dataJSON];
                //} else if(dataJSON.firstName[0].Value === '409') {
                //    return [409, dataJSON];
                //}

                return [200, {}];
            });
    }
    //start-non-standard
    @Inject('$httpBackend')
    //end-non-standard
    static runFactory($httpBackend){
        EmployeeResourceMock.instance = new EmployeeResourceMock($httpBackend);
        return EmployeeResourceMock.instance;
    }
}
