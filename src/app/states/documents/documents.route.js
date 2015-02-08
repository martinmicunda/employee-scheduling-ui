'use strict';

function documentsRoute($stateProvider) {
    $stateProvider
        .state('documents', {
            url: '/documents',
            templateUrl: 'app/states/documents/documents.html'
        });
}
documentsRoute.$inject = ['$stateProvider'];

export default documentsRoute;
