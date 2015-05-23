/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import template from './language.html!text';

function languageRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('settings.language', {
            url: '/language',
            template: template,
            controller: 'LanguageController as vm',
            resolve: {
                languages: LanguageResource => LanguageResource.getList(),
                settings: SettingService => SettingService.getList()
            }
        });
}

export default languageRoute;

