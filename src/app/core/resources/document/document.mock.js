/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import files from './fixtures/files.json!json';
import files1 from './fixtures/files_1.json!json';
import document from './fixtures/document_1.json!json';
import documents from './fixtures/documents.json!json';
import AbstractResourceMock from '../abstract-resource-mock';
import {HEADER_API_VERSION} from '../../constants/constants';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class DocumentResourceMock extends AbstractResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend','localStorageService')
    //end-non-standard
    runFactory($httpBackend, localStorageService){
        const patternBase = new RegExp(`\/files`);
        const patternGet = new RegExp(`\/files\/[a-z]*`);
        const patternId = new RegExp(`\/(\\d+|[a-z]*)/files`);

        files.forEach(function (data) {
            localStorageService.set(`file_${data.documentId}`, data);
        });

        $httpBackend.whenGET(patternBase)
            .respond( (method, url, data, headers) => {
                console.log('GET',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                const id = url.match(patternId)[1];
                const dataLocal = localStorageService.get(`file_${id}`);

                if(id === '404') {
                    return [404];
                } else if(id === '500') {
                    return [500];
                }

                return [200, dataLocal ? dataLocal : files1];
            });

        super.init($httpBackend, localStorageService, 'documents', document, documents, 'name');
    }
}
