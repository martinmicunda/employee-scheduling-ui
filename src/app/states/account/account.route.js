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
                employee: EmployeeResource => EmployeeResource.get('1'),
                languages: LanguageResource => LanguageResource.getList(),
                positions: PositionResource => PositionResource.getList({lang: 'en'}) // TODO:(martin) language should comes from user profile
            }
        });
}

export default accountRoute;
