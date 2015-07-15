/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './position.mock';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'PositionResource'
})
@Inject('Restangular')
//end-non-standard
class PositionResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    get(id) {
        return this.Restangular
            .one('positions', id)
            .get();
    }

    getList() {
        return this.Restangular
            .all('positions')
            .withHttpConfig({cache: true})
            .getList();
    }

    create(position) {
        return this.Restangular
            .all('positions')
            .post(position);
    }

    delete(id) {
        return this.Restangular
            .one('positions', id)
            .remove();
    }
}
