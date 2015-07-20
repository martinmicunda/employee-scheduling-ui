/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'DocumentService'
})
//end-non-standard
class DocumentService {
    constructor() {
        this.documents = [];
    }

    getDocuments() {
        return this.documents;
    }

    setDocuments(documents) {
        this.documents = documents;
    }

    addDocument(document) {
        this.documents.push(document);
    }

    updateDocument(document) {
        for (let i = 0; i < this.documents.length; i++) {
            if(this.documents[i].id === document.id) {
                this.documents[i] = document;
            }
        }
    }
}

