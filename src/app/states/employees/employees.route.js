'use strict';

function employeesRoute($stateProvider) {
    $stateProvider
        .state('employees', {
            url: '/employees',
            templateUrl: 'app/states/employees/employees.html',
            controller: 'EmployeesController as vm',
            resolve: {
                employees: ['EmployeeResource', EmployeeResource => EmployeeResource.getList()],
                languages: ['LanguageResource', LanguageResource => LanguageResource.getList()],
                positions: ['PositionResource', PositionResource => PositionResource.getList({lang: 'en'})], // TODO:(martin) language should comes from user profile
                roles: ['RoleResource', RoleResource => RoleResource.getList({lang: 'en'})] // TODO:(martin) language should comes from user profile
            }
        });
}
employeesRoute.$inject = ['$stateProvider'];

export default employeesRoute;

