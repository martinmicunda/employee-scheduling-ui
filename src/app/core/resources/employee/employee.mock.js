/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from './fixtures/employee_1.json!json';
import employees from './fixtures/employees.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class EmployeeResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    static runFactory($httpBackend, localStorageService){
        employees.forEach(function (employee) {
            localStorageService.set(`employee_${employee.id}`, employee);
        });

        $httpBackend.whenGET(/\/employees\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                const id = url.match(/\/employees\/(\d+)/)[1];
                const employeeLocal = localStorageService.get(`employee_${id}`);

                if(id === '404') {
                    return [404];
                } else if(id === '500') {
                    return [500];
                }

                return [200, employeeLocal ? employeeLocal : employee];
            });

        $httpBackend.whenGET(/\/employees/)
            .respond( (method, url) => {
                console.log('GET',url);
                const employeesLocal = localStorageService.findLocalStorageItems(/\.employee_(\d+)/);

                return [200, employeesLocal.length > 0 ? employeesLocal : employees];
            });

        $httpBackend.whenPOST(/\/employees/)
            .respond( (method, url, data) => {
                console.log('POST',url);
                data = JSON.parse(data);

                if(data.firstName === '500') {
                    return [500];
                } else if(data.firstName === '409') {
                    return [409];
                }

                data.id = Math.floor(Date.now() / 1000);
                localStorageService.set(`employee_${data.id}`, data);

                return [201, {id: data.id}];
            });

        $httpBackend.whenPUT(/\/employees/)
            .respond( (method, url, data) => {
                console.log('PUT',url);
                data = JSON.parse(data);

                if(data.firstName === '404') {
                    return [404];
                } else if(data.firstName === '409') {
                    return [409];
                } else if(data.firstName === '500') {
                    return [500];
                }

                localStorageService.set(`employee_${data.id}`, data);
                return [200, data];
            });

        $httpBackend.whenDELETE(/\/employees/)
            .respond( (method, url, data) => {
                console.log('DELETE',url);
                data = JSON.parse(data);

                if(data.firstName === '404') {
                    return [404];
                } else if(data.firstName === '500') {
                    return [500];
                }

                const id = url.match(/\/employees\/(\d+)/)[1];
                localStorageService.remove(`employee_${id}`);

                return [204];
            });
    }
}
