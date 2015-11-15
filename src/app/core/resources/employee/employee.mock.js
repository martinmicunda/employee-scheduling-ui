/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from './fixtures/employee_1.json!json';
import employees from './fixtures/employees.json!json';
import AbstractResourceMock from '../abstract-resource-mock';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class EmployeeResourceMock extends AbstractResourceMock{
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    runFactory($httpBackend, localStorageService){
        $httpBackend.whenGET(/\/employees\/([^&]*)\/unique/)
            .respond( (method, url) => {
                console.log('GET',url);
                const email = url.match(/\/employees\/([^&]*)\/unique/)[1];
                const dataListLocal = localStorageService.findLocalStorageItems(new RegExp(`employee_(\\d+|[a-z]*)`));
                const dataLocal = dataListLocal.find((employee) => employee.email === email);

                if(!dataLocal) {
                    return [404];
                }

                return [200, dataLocal];
            });

        super.init($httpBackend, localStorageService, 'employees', employee, employees, 'firstName');
    }
}
