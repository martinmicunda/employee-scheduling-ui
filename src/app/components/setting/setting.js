/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import SettingService from './setting.service';
import settingServiceMock from './setting.service.mock';

export default angular.module('app.setting', [])
    .service('SettingService', SettingService)
    .run(settingServiceMock);
