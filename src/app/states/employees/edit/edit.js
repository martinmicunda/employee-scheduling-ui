import accountDetailsModule from './account-details/account-details';
import accountSettingsModule from './account-settings/account-settings';
import contactDetailsModule from './contact-details/contact-details';
import bankDetailsModule from './bank-details/bank-details';
import hourlyRatesModule from './hourly-rates/hourly-rates';

import employeesEditRoute from './edit.route';
import EmployeesEditController from './edit.controller';

export default angular.module('app.employees.edit', [
    accountDetailsModule.name,
    accountSettingsModule.name,
    contactDetailsModule.name,
    bankDetailsModule.name,
    hourlyRatesModule.name
]).config(employeesEditRoute)
    .controller('EmployeesEditController', EmployeesEditController);
