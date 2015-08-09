/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import template from './language.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.language', {
    url: '/language',
    template: template,
    resolve: {
        languages: ['LanguageResource', LanguageResource => LanguageResource.getList(null, true)],
        setting: ['SettingResource', SettingResource => SettingResource.get('app')]
    }
})
@Inject('languages', 'setting', 'FormService', 'SettingModel')
//end-non-standard
class SettingLanguage {
    constructor(languages, setting, FormService, SettingModel) {
        this.languages = languages;
        this.setting = setting;
        this.FormService = FormService;
        this.SettingModel = SettingModel;
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = FormService.getSaveButtonOptions();
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.FormService.save(this.SettingModel, this.setting, this, form);
    }
}

