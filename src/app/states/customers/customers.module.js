import customersRoute from './customers.route';

let moduleName = 'app.customers';

angular.module(moduleName, [])
    .config(customersRoute);

export default moduleName;
