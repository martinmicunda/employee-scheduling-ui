/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../core/constants/constants';
import Employees from './employees.js';

describe('Employees', () => {
    let component = '<employees></employees>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/employees',
            state = 'app.employees',
            currentState,
            $state, $injector, PositionModel, EmployeeModel;

        beforeEach(inject((_$state_, _$injector_, _PositionModel_, _EmployeeModel_) => {
            $state = _$state_;
            $injector = _$injector_;
            PositionModel = _PositionModel_;
            EmployeeModel = _EmployeeModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `employees`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        itAsync(`should resolve 'init' for '${url}' state`, () => {
            spyOn(PositionModel, 'initCollection');
            spyOn(EmployeeModel, 'initCollection');

            return $injector.invoke(currentState.resolve.init).then(() => {
                expect(PositionModel.initCollection).toHaveBeenCalledWith(null, true);
                expect(EmployeeModel.initCollection).toHaveBeenCalledWith({fields: 'avatar,firstName,lastName,email,phoneNumber,position,status'});
            });
        });

        it(`should have access level set to '${ACCESS_LEVELS.manager}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.manager);
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

        it('should contain employees component', () => {
            element = render();

            expect(element.controller('employees')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let employees, FormService, EmployeeModel, PositionModel, collectionMock = 'collectionMock';

        beforeEach(inject((_FormService_, _EmployeeModel_, _PositionModel_) => {
            FormService = _FormService_;
            PositionModel = _PositionModel_;
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have positions property', () => {
            spyOn(PositionModel, 'getCollection').and.returnValue(collectionMock);
            employees = new Employees(EmployeeModel, PositionModel, FormService);

            expect(employees.positions).toEqual(collectionMock);
            expect(PositionModel.getCollection).toHaveBeenCalled();
        });

        it('should have employees property', () => {
            spyOn(EmployeeModel, 'getCollection').and.returnValue(collectionMock);
            employees = new Employees(EmployeeModel, PositionModel, FormService);

            expect(employees.employees).toEqual(collectionMock);
            expect(EmployeeModel.getCollection).toHaveBeenCalled();
        });

        it('should have listViewTable property set to true', () => {
            employees = new Employees(EmployeeModel, PositionModel, FormService);

            expect(employees.listViewTable).toEqual(true);
        });

        it('should toggleListView', () => {
            employees = new Employees(EmployeeModel, PositionModel, FormService);

            expect(employees.listViewTable).toEqual(true);

            employees.toggleListView();

            expect(employees.listViewTable).toEqual(false);
        });

        it('should delete employee', () => {
            let employee = 'employee';
            spyOn(FormService, 'delete');
            employees = new Employees(EmployeeModel, PositionModel, FormService);

            employees.deleteEmployee(employee);
            expect(FormService.delete).toHaveBeenCalledWith(EmployeeModel, employee, employees);
        });
    });
});
