/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Password from './password.js';

describe('Password', () => {
    let component = '<password-details></password-details>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/account/password',
            state = 'app.account.password',
            currentState,
            $state, $injector;

        beforeEach(inject(( _$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `password-details`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
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

        it('should contain password component', () => {
            element = render();

            expect(element.controller('passwordDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let password, FormService, EmployeeModel,
            itemMock = 'itemMock';

        beforeEach(inject((_FormService_, _EmployeeModel_) => {
            FormService = _FormService_;
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            password = new Password(EmployeeModel, FormService);

            expect(password.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            password = new Password(EmployeeModel, FormService);

            expect(password.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            password = new Password(EmployeeModel, FormService);

            expect(password.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(itemMock);
            password = new Password(EmployeeModel, FormService);

            expect(password.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            password = new Password(EmployeeModel, FormService);

            password.save(form);

            expect(password.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(FormService, 'save').and.returnValue(Promise.resolve());
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            password = new Password(EmployeeModel, FormService);

            return password.save(form).then(() => {
                expect(password.isSubmitting).toEqual(true);
                expect(FormService.save).toHaveBeenCalledWith(EmployeeModel, password.employee, password, form);
                expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();
            });
        });
    });
});
