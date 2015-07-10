/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './role.mock';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'RoleResource'
})
@Inject('Restangular')
//end-non-standard
class RoleResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getList(query) {
        return this.Restangular
            .all('roles')
            .withHttpConfig({cache: true})
            .getList(query);
    }
}
