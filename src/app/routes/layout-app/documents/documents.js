/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './add/add';
//import './edit/edit';
import template from './documents.html!text';
import {RouteConfig, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents', {
    url: '/documents',
    template: template,
    resolve: {
        documents: ['DocumentResource', DocumentResource => DocumentResource.getList()],
    }
})
@Inject('documents', 'FormService', 'DocumentResource', 'DocumentService', 'filterFilter')
//end-non-standard
class Documents {
    constructor(documents, FormService, DocumentResource, DocumentService, filterFilter) {
        DocumentService.setDocuments(documents);
        this.documents = DocumentService.getDocuments();
        this.FormService = FormService;
        this.DocumentResource = DocumentResource;
        this.filteredDocuments = Object.assign(documents);
        this.filterField = '';
        this.filterFilter = filterFilter;
    }

    filterDocuments() {
        this.filteredDocuments = this.filterFilter(this.documents, {folderName: this.filterField});
    }

    deleteDocument(document) {
        this.DocumentResource.delete(document.id).then(() => {
            this.documents.splice(this.documents.indexOf(document), 1);
            this.filteredDocuments.splice(this.filteredDocuments.indexOf(document), 1);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
