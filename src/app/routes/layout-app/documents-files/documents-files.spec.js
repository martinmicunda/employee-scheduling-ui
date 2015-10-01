/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../core/constants/constants';
import DocumentsFiles from './documents-files.js';

describe('DocumentsFiles', () => {
    let component = '<documents-files></documents-files>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/documents/${id}/files`,
            state = 'app.documents-files',
            currentState,
            $state, $injector, DocumentModel;

        beforeEach(inject((_$state_, _$injector_, _$stateParams_, _DocumentModel_) => {
            $state = _$state_;
            $injector = _$injector_;
            _$stateParams_.id = id;
            DocumentModel = _DocumentModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `documents-files`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it(`should resolve 'init' for '${url}' state`, () => {
            spyOn(DocumentModel, 'initFilesCollection');

            $injector.invoke(currentState.resolve.init);

            expect(DocumentModel.initFilesCollection).toHaveBeenCalledWith(id);
        });

        it(`should have access level set to '${ACCESS_LEVELS.employee}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.employee);
        });
    });

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element;

        beforeEach(inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should contain documents-files component', () => {
            element = render();

            expect(element.controller('documentsFiles')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let documentsFiles, FormService, DocumentModel, collectionMock = 'collectionMock';

        beforeEach(inject((_FormService_, _DocumentModel_) => {
            FormService = _FormService_;
            DocumentModel = _DocumentModel_;
        }));

        it('should have files property', () => {
            spyOn(DocumentModel, 'getFilesCollection').and.returnValue({files: collectionMock});
            documentsFiles = new DocumentsFiles(FormService, DocumentModel);

            expect(documentsFiles.files).toEqual(collectionMock);
            expect(DocumentModel.getFilesCollection).toHaveBeenCalled();
        });

        it('should have folderName property', () => {
            const documentId = 'documentId';
            spyOn(DocumentModel, 'getItemById').and.returnValue(collectionMock);
            spyOn(DocumentModel, 'getFilesCollection').and.returnValue({documentId: documentId});

            documentsFiles = new DocumentsFiles(FormService, DocumentModel);

            expect(documentsFiles.folderName).toEqual(collectionMock);
            expect(DocumentModel.getFilesCollection).toHaveBeenCalled();
            expect(DocumentModel.getItemById).toHaveBeenCalledWith(documentId);
        });

        it('should delete document', () => {
            const document = 'document';
            spyOn(FormService, 'delete');

            documentsFiles = new DocumentsFiles(FormService, DocumentModel);

            documentsFiles.deleteFile(document);

            expect(FormService.delete).toHaveBeenCalledWith(DocumentModel, document, documentsFiles);
        });
    });
});
