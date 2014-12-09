import employeesRoute from './employees.route';
import EmployeesController from './employees.controller';

export default angular.module('app.employees', [])
    .config(employeesRoute)
    .controller('EmployeesController', EmployeesController);
