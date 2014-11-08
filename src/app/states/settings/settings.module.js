import settingsRoute from './settings.route';

let moduleName = 'app.settings';

angular.module(moduleName, [])
    .config(settingsRoute);

export default moduleName;
