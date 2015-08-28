/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import PartnerResource from './partner.js';

describe('PartnerResource', () => {

    let partnerResource, mockData= '$http', route = `partners`;

    beforeEach(() => {
        partnerResource = new PartnerResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(partnerResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(partnerResource.route).toEqual(route);
    });
});
