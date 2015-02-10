'use strict';

import template from './documents.html!text';

function documentsRoute($stateProvider) {
    $stateProvider
        .state('documents', {
            url: '/documents',
            template: template
        });
}
documentsRoute.$inject = ['$stateProvider'];

export default documentsRoute;
