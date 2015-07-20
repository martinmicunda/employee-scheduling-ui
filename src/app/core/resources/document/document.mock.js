/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import document1 from './fixtures/document_1.json!json';
import documents from './fixtures/documents.json!json';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class DocumentResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend','localStorageService')
    //end-non-standard
    static runFactory($httpBackend, localStorageService){
        documents.forEach(function (document) {
            localStorageService.set(`document_${document.id}`, document);
        });

        $httpBackend.whenGET(/\/documents\/[a-z]*/)
            .respond( (method, url) => {
                console.log('GET',url);
                const id = url.match(/\/documents\/(\d+)/)[1];
                const documentLocal = localStorageService.get(`document_${id}`);

                if(id === '404') {
                    return [404];
                } else if(id === '500') {
                    return [500];
                }

                return [200, documentLocal ? documentLocal : document1];
            });

        $httpBackend.whenGET(/\/documents/)
            .respond( (method, url) => {
                console.log('GET',url);
                const documentsLocal = localStorageService.findLocalStorageItems(/\.document_(\d+)/);

                return [200, documentsLocal.length > 0 ? documentsLocal : documents];
            });

        $httpBackend.whenPOST(/\/documents/)
            .respond( (method, url, data) => {
                console.log('POST',url);
                data = JSON.parse(data);

                if(data.name === '500') {
                    return [500];
                } else if(data.name === '409') {
                    return [409];
                }

                data.id = Math.floor(Date.now() / 1000);
                localStorageService.set(`document_${data.id}`, data);

                return [201, {id: data.id}];
            });

        $httpBackend.whenPUT(/\/documents/)
            .respond( (method, url, data) => {
                console.log('PUT',url);
                data = JSON.parse(data);

                if(data.name === '404') {
                    return [404];
                } else if(data.name === '409') {
                    return [409];
                } else if(data.name === '500') {
                    return [500];
                }

                localStorageService.set(`document_${data.id}`, data);
                return [200, data];
            });

        $httpBackend.whenDELETE(/\/documents/)
            .respond( (method, url, data) => {
                console.log('DELETE',url);
                data = JSON.parse(data);

                if(data.name === '404') {
                    return [404];
                } else if(data.name === '500') {
                    return [500];
                }

                const id = url.match(/\/documents\/(\d+)/)[1];
                localStorageService.remove(`document_${id}`);

                return [204];
            });
    }
}
