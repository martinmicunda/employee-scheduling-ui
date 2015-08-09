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
        init: ['EmployeeModel', EmployeeModel => EmployeeModel.initCollection()]
    }
})
@Inject('EmployeeModel', 'FormService')
//end-non-standard
class Employees {
    constructor(EmployeeModel, FormService) {
        this.employees = EmployeeModel.getCollection();
        this.FormService = FormService;
        this.EmployeeModel = EmployeeModel;
        this.listViewTable = true;
    }

    toggleListView() {
        this.listViewTable = !this.listViewTable;
    }

    deleteEmployee(employee) {
        this.FormService.delete(this.EmployeeModel, employee, this);
    }
}
