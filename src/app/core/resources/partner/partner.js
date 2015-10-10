/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './partner.mock.js#?ENV|mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'PartnerResource'
})
@Inject('$http')
//end-non-standard
class PartnerResource extends AbstractResource {
    constructor($http) {
        super($http, 'partners');
    }
}

export default PartnerResource;
