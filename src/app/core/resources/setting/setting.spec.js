/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import SettingResource from './setting.js';

describe('SettingResource', () => {

    let settingResource, mockData= '$http', route = `settings`;

    beforeEach(() => {
        settingResource = new SettingResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(settingResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(settingResource.route).toEqual(route);
    });
});
