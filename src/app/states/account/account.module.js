import accountRoute from './account.route';

let moduleName = 'app.account';

angular.module(moduleName, [])
    .config(accountRoute);

export default moduleName;
