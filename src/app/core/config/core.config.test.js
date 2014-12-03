/**
 * Stubbing of HTTP requests for backend-less frontend testing
 */
import 'angular-mocks';

function coreConfigTest($provide) {
    'use strict';
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
}

function coreRunTest($httpBackend) {
    'use strict';
    $httpBackend.whenGET(/^\w+.*/).passThrough();
    $httpBackend.whenPOST(/^\w+.*/).passThrough();
}

export default angular.module('app.core.test', [])
    .config(coreConfigTest)
    .run(coreRunTest);
