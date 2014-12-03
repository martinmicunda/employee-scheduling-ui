'use strict';

// vendor modules
import './vendor';

// app core modules
import coreModule from './core/core.module';

// app component modules
import employeeModule from './components/employee/employee';

// app state (feature) modules
import accountModule from './states/account/account';
import customersModule from './states/customers/customers.module';
import dashboardModule from './states/dashboard/dashboard.module';
import documentsModule from './states/documents/kidsfun/documents.kidsfun.module';
import employeesModule from './states/employees/employees.module';
import reportsModule from './states/reports/reports.module';
import scheduleModule from './states/schedule/schedule.module';
import settingsModule from './states/settings/settings.module';

let mainModule = angular.module('app', [
    // angular modules
    'ngAnimate',
    'ngMessages',

    // 3rd party modules
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'jp.ng-bs-animated-button',

    // mm components modules
    //'mm.authentication',
    //'mm.user',
    //'mm.centered',

    // app core module
    coreModule.name,

    //  component modules
    employeeModule.name,

    // app state (feature) modules
    accountModule.name,
    customersModule.name,
    dashboardModule.name,
    documentsModule.name,
    employeesModule.name,
    reportsModule.name,
    scheduleModule.name,
    settingsModule.name
]);

export default mainModule;
