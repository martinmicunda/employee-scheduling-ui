/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import DocumentResource from './document.js';

describe('DocumentResource', () => {

    let documentResource, $http, id = '1', route = `documents`;

    beforeEach(inject((_$http_) => {
        $http = _$http_;
        documentResource = new DocumentResource($http);
    }));

    it(`should have 'http' property set to $http`, () => {
        expect(documentResource.http).toEqual($http);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(documentResource.route).toEqual(route);
    });

    it('should call GET role resource', inject(($httpBackend) => {
        $httpBackend.whenGET(`/${route}/${id}/files`).respond(() => [200, 'files']);

        documentResource.getDocumentFiles(id).then((respond) => {
            expect(respond.data).toEqual('files');
        });

        $httpBackend.flush();
    }));
});
