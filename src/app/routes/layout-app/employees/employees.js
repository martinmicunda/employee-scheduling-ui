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
        roles: ['RoleResource', RoleResource => RoleResource.getList({lang: 'en'}, true)], // TODO:(martin) language should comes from user profile
        employees: ['EmployeeResource', EmployeeResource => EmployeeResource.getList()],
        languages: ['LanguageResource', LanguageResource => LanguageResource.getList(null, true)],
        positions: ['PositionResource', PositionResource => PositionResource.getList({lang: 'en'})] // TODO:(martin) language should comes from user profile
    }
})
@Inject('roles', 'employees', 'languages', 'positions', 'EmployeeResource', 'FormService')
//end-non-standard
class Employees {
    constructor(roles, employees, languages, positions, EmployeeResource, FormService) {
        this.EmployeeResource = EmployeeResource;
        this.roles = roles;
        this.employees = employees;
        this.languages = languages;
        this.positions = positions;
        this.listViewTable = true;
        this.FormService = FormService;
    }

    toggleListView() {
        this.listViewTable = !this.listViewTable;
    }

    deleteEmployee(employee) {
        this.EmployeeResource.delete(employee.id).then(() => {
            this.employees.splice(this.employees.indexOf(employee), 1);
            this.FormService.success(this);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
