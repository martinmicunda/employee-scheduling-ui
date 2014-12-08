/**
 * @ngInject
 */
function accountRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('account', {
            url: '/account',
            abstract: true,
            templateUrl: 'app/states/account/account.html',
            controller: 'AccountController as vm',
            resolve: {/* @ngInject */
                employee: function(EmployeeResource){
                    return EmployeeResource.get('1');
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

export default accountRoute;
