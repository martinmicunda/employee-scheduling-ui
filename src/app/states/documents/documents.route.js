'use strict';

function documentsRoute($stateProvider) {

    $stateProvider
        .state('documents', {
            url: '/documents',
            templateUrl: 'app/states/documents/documents.html'
        });
}

export default documentsRoute;
