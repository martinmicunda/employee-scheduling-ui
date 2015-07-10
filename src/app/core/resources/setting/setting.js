/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './setting.mock';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'SettingResource'
})
@Inject('Restangular')
//end-non-standard
class SettingResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getList() {
        return this.Restangular
            .one('settings')
            .withHttpConfig({cache: true})
            .get();
    }
}
