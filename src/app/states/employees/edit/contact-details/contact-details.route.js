'use strict';

import template from './contact-details.html!text';

function contactDetailsRoute($stateProvider) {
    'ngInject';
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

export default contactDetailsRoute;
