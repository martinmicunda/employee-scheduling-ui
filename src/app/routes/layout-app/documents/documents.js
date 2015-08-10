/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './documents.html!text';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents', {
    url: '/documents',
    template: '<documents></documents>',
    resolve: {
        init: ['DocumentModel', DocumentModel => DocumentModel.initCollection()]
    }
})
@Component({
    selector: 'documents'
})
@View({
    template: template
})
@Inject('FormService', 'DocumentModel')
//end-non-standard
class Partners {
    constructor(FormService, DocumentModel) {
        this.documents = DocumentModel.getCollection();
        this.FormService = FormService;
        this.DocumentModel = DocumentModel;
    }

    deleteDocument(document) {
        this.FormService.delete(this.DocumentModel, document, this);
    }
}
