/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import SettingModel from './setting.js';

describe('SettingModel', () => {

    let settingModel, mockObject = {test: 'test'};

    beforeEach(() => {
        settingModel = new SettingModel(mockObject);
    });

    it(`should have 'resource' property set to SettingModel`, () => {
        expect(settingModel.resource).toEqual(mockObject);
    });
});
