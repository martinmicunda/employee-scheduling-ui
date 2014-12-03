import EmployeeResource from './employee.resource';
import employeeResourceMock from './employee.resource.mock';

export default angular.module('app.employee', [])
    .service('EmployeeResource', EmployeeResource)
    .run(employeeResourceMock);
