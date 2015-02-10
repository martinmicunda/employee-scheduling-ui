'use strict';

import template from './add.html!text';

function employeesAddRoute($stateProvider) {

    $stateProvider
        //http://blog.chorip.am/articles/angularsjs-ui-router-and-in-modal-nested-states/

    //http://stackoverflow.com/questions/26043295/multistep-form-using-angular-ui-router TODO: wizard validation
        .state('employees.add', {
            url: '/add',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                $modal.open({
                    template: template,
                    resolve: {
                        languages: ['LanguageResource', LanguageResource => LanguageResource.getList()],
                        positions: ['PositionResource', PositionResource => PositionResource.getList({lang: 'en'})], // TODO:(martin) language should comes from user profile
                        roles: ['RoleResource', RoleResource => RoleResource.getList({lang: 'en'})] // TODO:(martin) language should comes from user profile
                    },
                    controller: 'EmployeesAddController',
                    controllerAs: 'vm',
                    size: 'lg'
                }).result.finally(function() {
                        $state.go('employees');
                    });
            }]
        });
}
employeesAddRoute.$inject = ['$stateProvider'];

export default employeesAddRoute;

