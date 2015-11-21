/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import MessageModel from './message.js';

describe('MessageModel', () => {

    let messageModel, mockObject = {test: 'test'};

    beforeEach(() => {
        messageModel = new MessageModel(mockObject);
    });

    it(`should have 'resource' property set to MessageModel`, () => {
        expect(messageModel.resource).toEqual(mockObject);
    });
});
