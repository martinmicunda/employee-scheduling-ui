/**
 * Stubbing of HTTP requests for backend-less frontend testing
 */
import 'angular-mocks';

function onConfigTest($provide) {
    'use strict';
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
}

function onRunTest($httpBackend) {
    'use strict';
    $httpBackend.whenGET(/^\w+.*/).passThrough();
    $httpBackend.whenPOST(/^\w+.*/).passThrough();
}
onConfigTest.$inject = ['$provide'];
onRunTest.$inject = ['$httpBackend'];

export default angular.module('app.core.test', [])
    .config(onConfigTest)
    .run(onRunTest);
