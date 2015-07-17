/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './partner.mock';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'PartnerResource'
})
@Inject('Restangular')
//end-non-standard
class PartnerResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    get(id) {
        return this.Restangular
            .one('partners', id)
            .get();
    }

    getList() {
        return this.Restangular
            .all('partners')
            .getList();
    }

    create(position) {
        return this.Restangular
            .all('partners')
            .post(position);
    }

    delete(id) {
        return this.Restangular
            .one('partners', id)
            .remove();
    }
}
