/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import template from './language.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.language', {
    url: '/language',
    template: '<language></language>',
    resolve: {
        init: ['SettingModel', 'LanguageModel', (SettingModel, LanguageModel) => Promise.all([SettingModel.initItem('app'),  LanguageModel.initCollection()])]
    }
})
@Component({
    selector: 'language'
})
@View({
    template: template
})
@Inject('SettingModel', 'LanguageModel', 'FormService')
//end-non-standard
class Language {
    constructor(SettingModel, LanguageModel, FormService) {
        this.setting = SettingModel.getItem();
        this.languages = LanguageModel.getCollection();
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

export default Language;

