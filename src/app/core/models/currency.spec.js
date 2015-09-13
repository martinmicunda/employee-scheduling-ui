/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import CurrencyModel from './currency.js';

describe('CurrencyModel', () => {

    let currencyModel, mockObject = {test: 'test'};

    beforeEach(() => {
        currencyModel = new CurrencyModel(mockObject);
    });

    it(`should have 'resource' property set to CurrencyModel`, () => {
        expect(currencyModel.resource).toEqual(mockObject);
    });
});
