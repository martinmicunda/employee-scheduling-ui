/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './add/add';
import './edit/edit';
import './message/message';
import './schedule/schedule';
import template from './employees.html!text';
import {RouteConfig, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees', {
    url: '/employees',
    template: template,
    resolve: {
        employees: ['EmployeeResource', EmployeeResource => EmployeeResource.getList()],
        languages: ['LanguageResource', LanguageResource => LanguageResource.getList()],
        positions: ['PositionResource', PositionResource => PositionResource.getList({lang: 'en'})], // TODO:(martin) language should comes from user profile
        roles: ['RoleResource', RoleResource => RoleResource.getList({lang: 'en'})] // TODO:(martin) language should comes from user profile
    }
})
@Inject('employees', 'languages', 'positions', 'roles', 'EmployeeResource', 'filterFilter')
//end-non-standard
class Employees {
    constructor(employees, languages, positions, roles, EmployeeResource, filterFilter) {
        this.EmployeeResource = EmployeeResource;
        this.employees = employees;
        this.filteredEmployees = Object.assign(employees);
        this.languages = languages;
        this.positions = positions;
        this.roles = roles;
        this.filterField = '';
        this.filterFilter = filterFilter;
        // pagination
        this.currentPage = 1;
        this.employeesPerPage = 10;
        this.listViewTable = true;
    }

    filterEmployees() {
        this.filteredEmployees = this.filterFilter(this.employees, {firstName: this.filterField});
    }

    toggleListView() {
        this.listViewTable = !this.listViewTable;
    }

    deleteEmployee(employee) {
        this.EmployeeResource.delete(employee.id).then(() => {
            this.employees.splice(this.employees.indexOf(employee), 1);
            this.filteredEmployees.splice(this.filteredEmployees.indexOf(employee), 1);
        },(response) => {
            if(response.status === 409) {
                //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing');
            } else {
                //toaster.pop('error', 'Error:', 'Location could not be updated. Please try again!');
            }
        });
    }
}
