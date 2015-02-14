'use strict';

import template from './documents.html!text';

function documentsRoute($stateProvider) {
    'ngInject';
    $stateProvider
        .state('documents', {
            url: '/documents',
            template: template
        });
}

export default documentsRoute;
