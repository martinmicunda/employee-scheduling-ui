import employeesRoute from './employees.route';

let moduleName = 'app.employees';

angular.module(moduleName, [])
    .config(employeesRoute);

export default moduleName;
