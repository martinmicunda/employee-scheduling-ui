/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'CurrencyModel'
})
@Inject('CurrencyResource')
//end-non-standard
class CurrencyModel extends AbstractModel {
    constructor(CurrencyResource) {
        super(CurrencyResource);
    }
}

export default CurrencyModel;
