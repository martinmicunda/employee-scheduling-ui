/**
 * @ngInject
 */
function employeesRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('employees', {
            url: '/employees',
            templateUrl: 'app/states/employees/employees.html',
            controller: 'EmployeesController as vm',
            resolve: {
                employees: EmployeeResource => EmployeeResource.getList(),
                languages: LanguageResource => LanguageResource.getList(),
                positions: PositionResource => PositionResource.getList({lang: 'en'}), // TODO:(martin) language should comes from user profile
                roles: RoleResource => RoleResource.getList({lang: 'en'}) // TODO:(martin) language should comes from user profile
            }
        });
}

export default employeesRoute;

