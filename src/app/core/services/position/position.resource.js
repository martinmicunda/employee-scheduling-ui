/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './position.resource.mock';
import {Service, Inject} from '../../../ng-decorator'; // jshint unused: false

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

    getList(query) {
        return this.Restangular
            .all('positions')
            .withHttpConfig({cache: true})
            .getList(query);
    }
}
