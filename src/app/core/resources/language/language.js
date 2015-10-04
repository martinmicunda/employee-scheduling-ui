/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// @exclude
import './language.mock.js#?ENV|mock';
// @endexclude
//@exec mockPath('./language.mock.js')
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'LanguageResource'
})
@Inject('$http')
//end-non-standard
class LanguageResource extends AbstractResource {
    constructor($http) {
        super($http, 'languages');
    }
}

export default LanguageResource;
