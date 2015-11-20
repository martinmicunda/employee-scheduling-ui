/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../core/constants/constants';
import Account from './account.js';

describe('Account', () => {
    let component = '<account></account>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/account',
            state = 'app.account',
            currentState,
            $state, $injector, $rootScope, EmployeeModel, EmployeeResource;

        beforeEach(inject((_$state_, _$rootScope_, _$injector_, _EmployeeModel_, _EmployeeResource_) => {
            $state = _$state_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            EmployeeModel = _EmployeeModel_;
            EmployeeResource = _EmployeeResource_;

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

        itAsync(`should resolve 'init' for '${url}' state`, () => {
            $rootScope.currentUser = {id: '1'};
            spyOn(EmployeeModel, 'setItem');
            spyOn(EmployeeResource, 'getAccountDetails').and.returnValue(Promise.resolve('fakeItem'));

            return $injector.invoke(currentState.resolve.init).then(() => {
                expect(EmployeeResource.getAccountDetails).toHaveBeenCalledWith($rootScope.currentUser.id);
                expect(EmployeeModel.setItem).toHaveBeenCalledWith('fakeItem');
            });
        });

        it(`should have access level set to '${ACCESS_LEVELS.employee}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.employee);
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
