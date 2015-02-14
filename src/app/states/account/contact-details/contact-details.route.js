'use strict';

import template from './contact-details.html!text';

function contactDetailsRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('account.contact-details', {
            url: '/contact-details',
            template: template
        });
}

export default contactDetailsRoute;
