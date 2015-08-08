/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

//import './add/add';
import template from './documents-files.html!text';
import {RouteConfig, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents-files', {
    url: '/documents/:id/files',
    template: template,
    resolve: {
        document: ['$stateParams', 'DocumentResource', ($stateParams, DocumentResource) => DocumentResource.getDocumentFiles($stateParams.id)]
    }
})
@Inject('document', 'FormService', 'DocumentResource', 'DocumentService')
//end-non-standard
class Files {
    constructor(document, FormService, DocumentResource, DocumentService) {
        DocumentService.setFiles(document.files);
        this.folderName = DocumentService.get(document.documentId);
        this.files = DocumentService.getFiles();
        this.FormService = FormService;
        this.DocumentResource = DocumentResource;
    }

    deleteFile(document) {
        this.DocumentResource.delete(document.id).then(() => {
            this.documents.splice(this.documents.indexOf(document), 1);
            this.FormService.success(this);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
