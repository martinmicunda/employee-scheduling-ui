/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import PositionModel from './position.js';

describe('PositionModel', () => {

    let positionModel, mockObject = {test: 'test'};

    beforeEach(() => {
        positionModel = new PositionModel(mockObject);
    });

    it(`should have 'resource' property set to PositionModel`, () => {
        expect(positionModel.resource).toEqual(mockObject);
    });
});
