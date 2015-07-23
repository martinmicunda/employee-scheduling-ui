/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './document.mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'DocumentResource'
})
@Inject('Restangular')
//end-non-standard
class DocumentResource extends AbstractResource {
    constructor(Restangular) {
        super(Restangular, 'documents');
    }

    getDocumentFiles(id) {
        return this.restangular
            .one(this.route, id)
            .customGET('files');
    }
}
