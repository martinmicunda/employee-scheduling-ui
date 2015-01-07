import accountDetailsModule from './account-details/account-details';
import accountSettingsModule from './account-settings/account-settings';

import employeesAddRoute from './add.route';
import EmployeesAddController from './add.controller';

export default angular.module('app.employees.add', [accountDetailsModule.name, accountSettingsModule.name])
    .config(employeesAddRoute)
    .controller('EmployeesAddController', EmployeesAddController);
