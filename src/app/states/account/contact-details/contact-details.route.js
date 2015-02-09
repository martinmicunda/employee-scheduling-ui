'use strict';

function contactDetailsRoute($stateProvider) {
    return $stateProvider
        .state('account.contact-details', {
            url: '/contact-details',
            templateUrl: 'app/states/account/contact-details/contact-details.html'
        });
}
contactDetailsRoute.$inject = ['$stateProvider'];

export default contactDetailsRoute;