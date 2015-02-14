'use strict';

import template from './employees.html!text';

function employeesRoute($stateProvider) {
    'ngInject';
    $stateProvider
        .state('employees', {
            url: '/employees',
            template: template,
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

