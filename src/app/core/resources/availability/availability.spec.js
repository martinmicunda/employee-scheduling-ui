/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AvailabilityResource from './availability.js';

describe('AvailabilityResource', () => {

    let availabilityResource, mockData= '$http', route = `availabilities`;

    beforeEach(() => {
        availabilityResource = new AvailabilityResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(availabilityResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(availabilityResource.route).toEqual(route);
    });
});
