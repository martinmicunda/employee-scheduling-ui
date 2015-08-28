/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AbstractModel from './abstract-model';
import {Service} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'ModalModel'
})
//end-non-standard
class ModalModel extends AbstractModel {
    constructor() {
        super(); // we only use modal with get/set item to store $modalInstance
    }
}

export default ModalModel;
