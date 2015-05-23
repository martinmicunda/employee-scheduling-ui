'use strict';

import template from './account.html!text';

function accountRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('account', {
            url: '/account',
            abstract: true,
            template: template,
            controller: 'AccountController as vm',
            resolve: {
                employee: EmployeeResource => EmployeeResource.get('1')
            }
        });
}

export default accountRoute;
