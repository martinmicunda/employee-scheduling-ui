/**
 * @ngInject
 */
function contactDetailsRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('account.contact-details', {
            url: '/contact-details',
            templateUrl: 'app/states/account/contact-details/contact-details.html'
        });
}

export default contactDetailsRoute;
