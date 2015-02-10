'use strict';

import template from './account.html!text';

function accountRoute($stateProvider) {
    return $stateProvider
        .state('account', {
            url: '/account',
            abstract: true,
            template: template,
            controller: 'AccountController as vm',
            resolve: {
                employee: ['EmployeeResource', EmployeeResource => EmployeeResource.get('1')],
                languages: ['LanguageResource', LanguageResource => LanguageResource.getList()],
                positions: ['PositionResource', PositionResource => PositionResource.getList({lang: 'en'})] // TODO:(martin) language should comes from user profile
            }
        });
}
accountRoute.$inject = ['$stateProvider'];

export default accountRoute;
