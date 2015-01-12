'use strict';

function accountRoute($stateProvider) {
    return $stateProvider
        .state('account', {
            url: '/account',
            abstract: true,
            templateUrl: 'app/states/account/account.html',
            controller: 'AccountController as vm',
            resolve: {
                employee: EmployeeResource => EmployeeResource.get('1'),
                languages: LanguageResource => LanguageResource.getList(),
                positions: PositionResource => PositionResource.getList({lang: 'en'}) // TODO:(martin) language should comes from user profile
            }
        });
}

export default accountRoute;
