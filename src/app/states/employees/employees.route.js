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
            resolve: {/* @ngInject */
                employees: function(EmployeeResource){
                    return EmployeeResource.getList();
                },/* @ngInject */
                languages: function(LanguageResource) {
                    return LanguageResource.getList();
                },/* @ngInject */
                positions: function(PositionResource){
                    return PositionResource.getList({lang: 'en'}); // TODO:(martin) language should comes from user profile
                },/* @ngInject */
                roles: function(RoleResource){
                    return RoleResource.getList({lang: 'en'}); // TODO:(martin) language should comes from user profile
                }
            }
        });
}

export default employeesRoute;

