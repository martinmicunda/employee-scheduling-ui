/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular';
import 'angular-mocks';
import DocumentModel from './document.js';

describe('DocumentModel', () => {

    let documentModel, id = '1', mockObject = {test: 'test'}, mockCollection = ['mock-data'];

    beforeEach(() => {
        documentModel = new DocumentModel(mockObject);
    });

    it(`should have 'resource' property set to DocumentModel`, () => {
        expect(documentModel.resource).toEqual(mockObject);
    });

    it(`should have 'files' property set to []`, () => {
        expect(documentModel.files).toEqual([]);
    });

    it(`should get files collection`, () => {
        documentModel.files = mockCollection;
        expect(documentModel.getFilesCollection()).toEqual(mockCollection);
    });

    it(`should init files collection`, inject(($q, $rootScope) => {
        let mockResource = {
            getDocumentFiles: function() {}
        };
        spyOn(mockResource, 'getDocumentFiles').and.returnValue($q.when(mockCollection));
        documentModel = new DocumentModel(mockResource);

        documentModel.initFilesCollection(id).then(() => {
            expect(documentModel.files).toEqual(mockCollection);
        });

        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(mockResource.getDocumentFiles).toHaveBeenCalledWith(id);
    }));
});
