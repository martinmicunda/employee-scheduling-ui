/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Account from './account.js';

describe('Account', () => {
    let component = '<account></account>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/account',
            state = 'app.account',
            currentState,
            $q, $state, $injector, EmployeeModel, SettingModel;

        beforeEach(inject((_$q_, _$state_, _$injector_, _SettingModel_, _EmployeeModel_) => {
            $q = _$q_;
            $state = _$state_;
            $injector = _$injector_;
            SettingModel = _SettingModel_;
            EmployeeModel = _EmployeeModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `account`', () => {
            expect(currentState.template).toEqual(component);
        });

        it('should have $state abstract set to `true`', () => {
            expect(currentState.abstract).toEqual(true);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should resolve 'init' for '${url}' state`, () => {
            const id = '1';
            spyOn($q, 'all');
            spyOn(SettingModel, 'initItem');
            spyOn(EmployeeModel, 'initItem');

            $injector.invoke(currentState.resolve.init);

            expect($q.all).toHaveBeenCalled();
            expect(EmployeeModel.initItem).toHaveBeenCalledWith(id);
            expect(SettingModel.initItem).toHaveBeenCalledWith('app');
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

        it('should contain account component', () => {
            element = render();

            expect(element.controller('account')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let account, EmployeeModel, itemMock = 'itemMock';

        beforeEach(inject((_EmployeeModel_) => {
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            account = new Account(EmployeeModel);

            expect(account.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });
    });
});
