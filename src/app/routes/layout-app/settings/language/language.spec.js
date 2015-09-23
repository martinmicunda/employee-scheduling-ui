/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Language from './language.js';

describe('Language', () => {
    let component = '<language></language>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/settings/language',
            state = 'app.settings.language',
            currentState,
            $state, $injector, SettingModel, LanguageModel;

        beforeEach(inject((_$state_, _$injector_, _SettingModel_, _LanguageModel_) => {
            $state = _$state_;
            $injector = _$injector_;
            SettingModel = _SettingModel_;
            LanguageModel = _LanguageModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `language`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        itAsync(`should resolve 'init' for '${url}' state`, () => {
            spyOn(SettingModel, 'initItem');
            spyOn(LanguageModel, 'initCollection');

            return $injector.invoke(currentState.resolve.init).then(() => {
                expect(SettingModel.initItem).toHaveBeenCalledWith('app');
                expect(LanguageModel.initCollection).toHaveBeenCalled();
            });
        });
    });

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element;

        beforeEach(inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should contain language component', () => {
            element = render();

            expect(element.controller('language')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let language, FormService, LanguageModel, SettingModel, collectionMock = 'collectionMock';

        beforeEach(inject((_FormService_, _LanguageModel_, _SettingModel_) => {
            FormService = _FormService_;
            LanguageModel = _LanguageModel_;
            SettingModel = _SettingModel_;
        }));

        it('should have setting property', () => {
            spyOn(SettingModel, 'getItem').and.returnValue(collectionMock);
            language = new Language(SettingModel, LanguageModel, FormService);

            expect(language.setting).toEqual(collectionMock);
            expect(SettingModel.getItem).toHaveBeenCalled();
        });

        it('should have partners property', () => {
            spyOn(LanguageModel, 'getCollection').and.returnValue(collectionMock);
            language = new Language(SettingModel, LanguageModel, FormService);

            expect(language.languages).toEqual(collectionMock);
            expect(LanguageModel.getCollection).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            language = new Language(SettingModel, LanguageModel, FormService);

            expect(language.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            language = new Language(SettingModel, LanguageModel, FormService);

            expect(language.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(collectionMock);
            language = new Language(SettingModel, LanguageModel, FormService);

            expect(language.saveButtonOptions).toEqual(collectionMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            language = new Language(SettingModel, LanguageModel, FormService);

            language.save(form);

            expect(language.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(SettingModel, 'getItem').and.returnValue(collectionMock);
            spyOn(FormService, 'save');
            language = new Language(SettingModel, LanguageModel, FormService);

            language.save(form);

            expect(language.isSubmitting).toEqual(true);
            expect(FormService.save).toHaveBeenCalledWith(SettingModel, language.setting, language, form);
        });
    });
});
