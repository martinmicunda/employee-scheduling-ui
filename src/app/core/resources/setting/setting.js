/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// @exclude
import './setting.mock.js#?ENV|mock';
// @endexclude
//@exec mockPath('./setting.mock.js')
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'SettingResource'
})
@Inject('$http')
//end-non-standard
class SettingResource extends AbstractResource {
    constructor($http) {
        super($http, 'settings');
    }
}

export default SettingResource;
