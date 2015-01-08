import employeesMessageRoute from './message.route';
import EmployeesMessageController from './message.controller';

export default angular.module('app.employees.message', [])
    .config(employeesMessageRoute)
    .controller('EmployeesMessageController', EmployeesMessageController);
