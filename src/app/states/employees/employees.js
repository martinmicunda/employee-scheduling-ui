import employeesAddModule from './add/add';
import employeesEditModule from './edit/edit';

import employeesRoute from './employees.route';
import EmployeesController from './employees.controller';

export default angular.module('app.employees', [employeesAddModule.name, employeesEditModule.name])
    .config(employeesRoute)
    .controller('EmployeesController', EmployeesController);
