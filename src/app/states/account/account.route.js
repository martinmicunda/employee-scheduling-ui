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
                employee:function(EmployeeResource){
                    return EmployeeResource.get('1');
                },
                positions: function(){
                    return ['cooker', 'animator', 'sales', 'CEO'];
                },
                roles: function(){
                    return ['user', 'manager', 'admin'];
                }
            }
        });
}

export default accountRoute;
