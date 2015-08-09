/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'DocumentModel'
})
@Inject('DocumentResource')
//end-non-standard
class DocumentModel extends AbstractModel {
    constructor(DocumentResource) {
        super(DocumentResource);
        this.files = [];
        this.DocumentResource = DocumentResource;
    }

    getFilesCollection() {
        return this.files;
    }

    initFilesCollection(id) {
        return this.DocumentResource.getDocumentFiles(id).then(files => this.files = files);
    }
}
