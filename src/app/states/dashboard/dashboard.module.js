import dashboardRoute from './dashboard.route';

let moduleName = 'app.dashboard';

angular.module(moduleName, [])
    .config(dashboardRoute);

export default moduleName;
