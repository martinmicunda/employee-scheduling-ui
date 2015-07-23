/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './documents.html!text';
import {RouteConfig, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents', {
    url: '/documents',
    template: template,
    resolve: {
        documents: ['DocumentResource', DocumentResource => DocumentResource.getList()]
    }
})
@Inject('documents', 'FormService', 'DocumentResource', 'DocumentService')
//end-non-standard
class Documents {
    constructor(documents, FormService, DocumentResource, DocumentService) {
        DocumentService.setList(documents);
        this.documents = DocumentService.getList();
        this.FormService = FormService;
        this.DocumentResource = DocumentResource;
    }

    deleteDocument(document) {
        this.DocumentResource.delete(document.id).then(() => {
            //this.documents.splice(this.documents.indexOf(document), 1);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
