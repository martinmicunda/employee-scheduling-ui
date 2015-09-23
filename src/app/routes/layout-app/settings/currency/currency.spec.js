/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Currency from './currency.js';

describe('Currency', () => {
    let component = '<currency></currency>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/settings/currency',
            state = 'app.settings.currency',
            currentState,
            $state, $injector, SettingModel, CurrencyModel;

        beforeEach(inject((_$state_, _$injector_, _SettingModel_, _CurrencyModel_) => {
            $state = _$state_;
            $injector = _$injector_;
            SettingModel = _SettingModel_;
            CurrencyModel = _CurrencyModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `currency`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        itAsync(`should resolve 'init' for '${url}' state`, () => {
            spyOn(SettingModel, 'initItem');
            spyOn(CurrencyModel, 'initCollection');

            return $injector.invoke(currentState.resolve.init).then(() => {
                expect(SettingModel.initItem).toHaveBeenCalledWith('app');
                expect(CurrencyModel.initCollection).toHaveBeenCalled();
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

        it('should contain currency component', () => {
            element = render();

            expect(element.controller('currency')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let currency, FormService, CurrencyModel, SettingModel,
            collectionMock = {data: 'collectionMock', currencyCode: 'EUR'},
            currencies = [
                {
                    code: 'EUR',
                    symbol: '€'
                },
                {
                    code: 'USD',
                    symbol: '$'
                }
            ];

        beforeEach(inject((_FormService_, _CurrencyModel_, _SettingModel_) => {
            FormService = _FormService_;
            CurrencyModel = _CurrencyModel_;
            SettingModel = _SettingModel_;
        }));

        it('should have setting property', () => {
            spyOn(SettingModel, 'getItem').and.returnValue(collectionMock);
            currency = new Currency(SettingModel, CurrencyModel, FormService);

            expect(currency.setting).toEqual(collectionMock);
            expect(SettingModel.getItem).toHaveBeenCalled();
        });

        it('should have currencies property', () => {
            spyOn(CurrencyModel, 'getCollection').and.returnValue(currencies);
            currency = new Currency(SettingModel, CurrencyModel, FormService);

            expect(currency.currencies).toEqual(currencies);
            expect(CurrencyModel.getCollection).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            currency = new Currency(SettingModel, CurrencyModel, FormService);

            expect(currency.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            currency = new Currency(SettingModel, CurrencyModel, FormService);

            expect(currency.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(collectionMock);
            currency = new Currency(SettingModel, CurrencyModel, FormService);

            expect(currency.saveButtonOptions).toEqual(collectionMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            currency = new Currency(SettingModel, CurrencyModel, FormService);

            currency.save(form);

            expect(currency.isSubmitting).toEqual(null);
            expect(currency.setting.currencySymbol).toBeUndefined();
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(CurrencyModel, 'getCollection').and.returnValue(currencies);
            spyOn(SettingModel, 'getItem').and.returnValue(collectionMock);
            spyOn(FormService, 'save');
            currency = new Currency(SettingModel, CurrencyModel, FormService);

            currency.save(form);

            expect(currency.isSubmitting).toEqual(true);
            expect(currency.setting.currencySymbol).toEqual(currencies[0].symbol);
            expect(FormService.save).toHaveBeenCalledWith(SettingModel, currency.setting, currency, form);
        });
    });
});
