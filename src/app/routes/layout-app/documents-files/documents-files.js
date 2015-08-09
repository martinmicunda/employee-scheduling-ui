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
        init: ['$stateParams', 'DocumentModel', ($stateParams, DocumentModel) => DocumentModel.initFilesCollection($stateParams.id)]
    }
})
@Inject('FormService', 'DocumentModel', 'DocumentService')
//end-non-standard
class Files {
    constructor(FormService, DocumentModel) {
        this.folderName = DocumentModel.getById(DocumentModel.getFilesCollection().documentId);
        this.files = DocumentModel.getFilesCollection().files;
        this.FormService = FormService;
        this.DocumentModel = DocumentModel;
    }

    deleteFile(document) {
        this.FormService.delete(this.DocumentModel, document, this);
    }
}
