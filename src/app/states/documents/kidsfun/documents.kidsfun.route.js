/**
 * @ngInject
 */
export default function documentsKidsfunRoute($stateProvider) {
    'use strict';

    $stateProvider
        .state('documents', {
            url: '/documents',
            abstract: true,
            templateUrl: '<div ui-view></div>'
        })
        .state('documents.kidsfun', {
            url: '/kidsfun',
            templateUrl: 'app/states/documents/kidsfun/documents.kidsfun.html'
        });
}

