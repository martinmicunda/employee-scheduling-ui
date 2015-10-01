/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './documents-files.html!text';
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents-files', {
    url: '/documents/:id/files',
    template: '<documents-files></documents-files>',
    resolve: {
        init: ['$stateParams', 'DocumentModel', ($stateParams, DocumentModel) => DocumentModel.initFilesCollection($stateParams.id)]
    },
    data: {
        access: ACCESS_LEVELS.employee
    }
})
@Component({
    selector: 'documents-files'
})
@View({
    template: template
})
@Inject('FormService', 'DocumentModel', 'DocumentService')
//end-non-standard
class Files {
    constructor(FormService, DocumentModel) {
        this.files = DocumentModel.getFilesCollection().files;
        this.folderName = DocumentModel.getItemById(DocumentModel.getFilesCollection().documentId);
        this.FormService = FormService;
        this.DocumentModel = DocumentModel;
    }

    deleteFile(document) {
        this.FormService.delete(this.DocumentModel, document, this);
    }
}

export default Files;
