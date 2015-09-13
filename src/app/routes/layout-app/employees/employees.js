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
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees', {
    url: '/employees',
    template: '<employees></employees>',
    resolve: {
        init: ['$q', 'EmployeeModel', 'PositionModel', ($q, EmployeeModel, PositionModel) => $q.all([EmployeeModel.initCollection(), PositionModel.initCollection(null, true)])]
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
