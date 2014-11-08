import reportsRoute from './reports.route';

let moduleName = 'app.reports';

angular.module(moduleName, [])
    .config(reportsRoute);

export default moduleName;
