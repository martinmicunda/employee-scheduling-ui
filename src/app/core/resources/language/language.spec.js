/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import LanguageResource from './language.js';

describe('LanguageResource', () => {

    let languageResource, mockData= '$http', route = `languages`;

    beforeEach(() => {
        languageResource = new LanguageResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(languageResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(languageResource.route).toEqual(route);
    });
});
