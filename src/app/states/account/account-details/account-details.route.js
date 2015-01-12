'use strict';

function accountDetailsRoute($stateProvider) {

    return $stateProvider
        .state('account.account-details', {
            url: '/account-details',
            templateUrl: 'app/states/account/account-details/account-details.html'
        });
}

export default accountDetailsRoute;
