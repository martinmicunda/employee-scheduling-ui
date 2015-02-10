'use strict';

import template from './contact-details.html!text';

function contactDetailsRoute($stateProvider) {
    return $stateProvider
        .state('account.contact-details', {
            url: '/contact-details',
            template: template
        });
}
contactDetailsRoute.$inject = ['$stateProvider'];

export default contactDetailsRoute;
