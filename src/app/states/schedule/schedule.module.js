import scheduleRoute from './schedule.route';

let moduleName = 'app.schedule';

angular.module(moduleName, [])
    .config(scheduleRoute);

export default moduleName;
