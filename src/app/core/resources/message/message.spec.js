/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import MessageResource from './message.js';

describe('MessageResource', () => {

    let messageResource, mockData= '$http', route = `emails`;

    beforeEach(() => {
        messageResource = new MessageResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(messageResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(messageResource.route).toEqual(route);
    });
});
