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
    serviceName: 'MessageModel'
})
@Inject('MessageResource')
//end-non-standard
class MessageModel extends AbstractModel {
    constructor(MessageResource) {
        super(MessageResource);
    }
}

export default MessageModel;
