'use strict';

import template from './contact-details.html!text';

function contactDetailsRoute($stateProvider) {

    return $stateProvider
        .state('employees.edit.contact-details', {
            url: '/contact-details',
            views: {
                'modal@': {
                    template: template
                }
            }
        });
}
contactDetailsRoute.$inject = ['$stateProvider'];

export default contactDetailsRoute;
