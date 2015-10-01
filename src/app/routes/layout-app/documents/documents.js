/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './documents.html!text';
import {ACCESS_LEVELS} from '../../../core/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents', {
    url: '/documents',
    template: '<documents></documents>',
    resolve: {
        init: ['DocumentModel', DocumentModel => DocumentModel.initCollection()]
    },
    data: {
        access: ACCESS_LEVELS.employee
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
class Documents {
    constructor(FormService, DocumentModel) {
        this.documents = DocumentModel.getCollection(); // TODO: this needs to change as we need to pass queries in url so back can filter documents depend on the permission and user role
        this.FormService = FormService;
        this.DocumentModel = DocumentModel;
    }

    deleteDocument(document) {
        this.FormService.delete(this.DocumentModel, document, this);
    }
}

export default Documents;
