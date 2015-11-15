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
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees', {
    url: '/employees',
    template: '<employees></employees>',
    resolve: {
        init: ['EmployeeModel', 'PositionModel', (EmployeeModel, PositionModel) => Promise.all([EmployeeModel.initCollection({fields: 'avatar,firstName,lastName,email,phoneNumber,position,status'}), PositionModel.initCollection(null, true)])]
    },
    data: {
        access: ACCESS_LEVELS.manager
    }
})
@Component({
    selector: 'employees'
})
@View({
    template: template
})
@Inject('EmployeeModel', 'PositionModel', 'FormService')
//end-non-standard
class Employees {
    constructor(EmployeeModel, PositionModel, FormService) {
        this.positions = PositionModel.getCollection();
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

export default Employees;
