/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './document.mock';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'DocumentResource'
})
@Inject('Restangular')
//end-non-standard
class DocumentResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    get(id) {
        return this.Restangular
            .one('documents', id)
            .get();
    }

    getList() {
        return this.Restangular
            .all('documents')
            .getList();
    }

    create(document) {
        return this.Restangular
            .all('documents')
            .post(document);
    }

    delete(id) {
        return this.Restangular
            .one('documents', id)
            .remove();
    }
}
