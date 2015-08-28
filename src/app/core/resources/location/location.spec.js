/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import LocationResource from './location.js';

describe('LocationResource', () => {

    let locationResource, mockData= '$http', route = `locations`;

    beforeEach(() => {
        locationResource = new LocationResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(locationResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(locationResource.route).toEqual(route);
    });
});
