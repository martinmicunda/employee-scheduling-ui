/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import languageRoute from './language.route';
import LanguageController from './language.controller';

export default angular.module('app.settings.language', [])
    .config(languageRoute)
    .controller('LanguageController', LanguageController);

