/**
 * @ngInject
 */
function documentsRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('documents', {
            url: '/documents',
            templateUrl: 'app/states/documents/documents.html'
        });
}

export default documentsRoute;
