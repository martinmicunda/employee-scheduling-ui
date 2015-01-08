import employeesScheduleRoute from './schedule.route';
import EmployeesScheduleController from './schedule.controller';

export default angular.module('app.employees.schedule', [])
    .config(employeesScheduleRoute)
    .controller('EmployeesScheduleController', EmployeesScheduleController);
