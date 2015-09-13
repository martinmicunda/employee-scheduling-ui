/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import CurrencyResource from './currency.js';

describe('CurrencyResource', () => {

    let currencyResource, mockData= '$http', route = `currencies`;

    beforeEach(() => {
        currencyResource = new CurrencyResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(currencyResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(currencyResource.route).toEqual(route);
    });
});
