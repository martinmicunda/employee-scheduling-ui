/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// @exclude
import './document.mock.js#?ENV|mock';
// @endexclude
//@exec mockPath('./document.mock.js')
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'DocumentResource'
})
@Inject('$http')
//end-non-standard
class DocumentResource extends AbstractResource {
    constructor($http) {
        super($http, 'documents');
    }

    getDocumentFiles(id) {
        return this.http.get(`/${this.route}/${id}/files`);
    }
}

export default DocumentResource;
