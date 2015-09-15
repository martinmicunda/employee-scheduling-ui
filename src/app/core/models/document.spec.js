/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

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

    itAsync(`should init files collection`, () => {
        let mockResource = {getDocumentFiles: () => {}};
        spyOn(mockResource, 'getDocumentFiles').and.returnValue(Promise.resolve(mockCollection));
        documentModel = new DocumentModel(mockResource);

        return documentModel.initFilesCollection(id).then(() => {
            expect(documentModel.files).toEqual(mockCollection);
            expect(mockResource.getDocumentFiles).toHaveBeenCalledWith(id);
        });
    });
});
