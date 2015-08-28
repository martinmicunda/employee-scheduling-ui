/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import LanguageModel from './language.js';

describe('LanguageModel', () => {

    let languageModel, mockObject = {test: 'test'};

    beforeEach(() => {
        languageModel = new LanguageModel(mockObject);
    });

    it(`should have 'resource' property set to LanguageModel`, () => {
        expect(languageModel.resource).toEqual(mockObject);
    });
});
