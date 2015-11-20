/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {PROFILE_COMPLETENESS_TYPES, USER_ROLES} from '../../../../core/constants/constants';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import EmployeeAdd from './add.js';

describe('EmployeeAdd', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/employees/add',
            state = 'app.employees.add',
            currentState, modalOptions,
            $state, $modal, $injector, $rootScope, EmployeeModel, ModalService, LocationModel, PositionModel;

        beforeEach(inject((_$state_, _$modal_, _$injector_, _$rootScope_, _EmployeeModel_, _PositionModel_, _LocationModel_, _ModalService_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            PositionModel = _PositionModel_;
            EmployeeModel = _EmployeeModel_;
            ModalService = _ModalService_;
            LocationModel = _LocationModel_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(PositionModel, 'initCollection');
            spyOn(LocationModel, 'initCollection');
            spyOn(EmployeeModel, 'initItem');
            spyOn($state, 'go');

            $state.go(state);
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        itAsync('should correctly show the employee add modal', function () {
            $injector.invoke(currentState.onEnter, this);
            return modalOptions.resolve.init[3](PositionModel, EmployeeModel, LocationModel).then(() => {
                expect($modal.open).toHaveBeenCalled();
                expect(PositionModel.initCollection).toHaveBeenCalledWith(null, true);
                expect(LocationModel.initCollection).toHaveBeenCalledWith(null, true);
                expect(EmployeeModel.initItem).toHaveBeenCalled();

                expect(modalOptions.size).toEqual('lg');
                expect(modalOptions.template).toBeDefined();
                expect(modalOptions.controllerAs).toEqual('vm');
                expect(modalOptions.controller.name).toEqual('EmployeeAdd');
            });
        });

        it('should redirect to `app.employees` route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.employees');
        });
    });

    describe('Controller', () => {
        let $state, $rootScope, employeeAdd, FormService, EmployeeModel, itemMock = {firstName: 'firstName', lastName: 'lastName', avatar: 'avatar'};

        beforeEach(inject((_$state_, _$rootScope_, _FormService_, _EmployeeModel_) => {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $rootScope.currentUser = {role: USER_ROLES.MANAGER};
            FormService = _FormService_;
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue({});
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.employee).toEqual({});
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isAdmin property set to true when user has admin role', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue({});
            $rootScope.currentUser = {role: USER_ROLES.ADMIN};

            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.isAdmin).toEqual(true);
        });

        it('should have isAdmin property set to false when user has not admin role', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue({});
            $rootScope.currentUser = {role: USER_ROLES.MANAGER};

            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.isAdmin).toEqual(false);
        });

        it('should have isSubmitting property', () => {
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.result).toEqual(null);
        });

        it('should have profileCompletenessType property', () => {
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.profileCompletenessType).toEqual(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
            expect(employeeAdd.saveButtonOptions.buttonDefaultText).toEqual('Create an Employee');
            expect(employeeAdd.saveButtonOptions.buttonSuccessText).toEqual('Created an Employee');
            expect(employeeAdd.saveButtonOptions.buttonSubmittingText).toEqual('Creating an Employee');
        });

        it('should have formSteps property for admin users', () => {
            $rootScope.currentUser = {role: USER_ROLES.ADMIN};
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.formSteps).toEqual([
                {route: 'app.employees.add.account-details', formName: 'employeeAccountDetailsForm', valid: false},
                {route: 'app.employees.add.contact-details', formName: 'employeeContactDetailsForm', valid: true},
                {route: 'app.employees.add.bank-details', formName: 'employeeBankDetailsForm', valid: true},
                {route: 'app.employees.add.hourly-rate', formName: 'employeeHourlyRateForm', valid: false},
                {route: 'app.employees.add.authorizations', formName: 'employeeAuthorizationsForm', valid: true},
                {route: 'app.employees.add.complete', formName: 'employeeCompleteForm', valid: true}
            ]);
        });

        it('should have formSteps property for non admin users', () => {
            $rootScope.currentUser = {role: USER_ROLES.MANAGER};
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.formSteps).toEqual([
                {route: 'app.employees.add.account-details', formName: 'employeeAccountDetailsForm', valid: false},
                {route: 'app.employees.add.contact-details', formName: 'employeeContactDetailsForm', valid: true},
                {route: 'app.employees.add.bank-details', formName: 'employeeBankDetailsForm', valid: true},
                {route: 'app.employees.add.hourly-rate', formName: 'employeeHourlyRateForm', valid: false},
                {route: 'app.employees.add.complete', formName: 'employeeCompleteForm', valid: true}
            ]);
        });

        it('should have calculate profile completeness when controller is initialise', () => {
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalledWith(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            employeeAdd.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should goToNextSection when form is valid with not null route', () => {
            let isFormValid = true, form = {$setPristine: () => {}}, route = 'route';
            spyOn($state, 'go');
            spyOn(form, '$setPristine');
            spyOn(FormService, 'nextState');
            spyOn(FormService, 'submitChildForm');
            spyOn(EmployeeModel, 'calculateProfileCompleteness');

            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.hasError).toBeUndefined();

            employeeAdd.goToNextSection(isFormValid, form, route);

            expect(employeeAdd.hasError).toEqual(false);
            expect($state.go).toHaveBeenCalledWith(route);
            expect(FormService.submitChildForm).toHaveBeenCalledWith($state.current.name, form, employeeAdd.formSteps);
            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalledWith(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);

            expect(form.$setPristine).not.toHaveBeenCalled();
            expect(FormService.nextState).not.toHaveBeenCalled();
        });

        it('should goToNextSection when form is valid without null route', () => {
            let isFormValid = true, form = {$setPristine: () => {}}, route = null;
            spyOn($state, 'go');
            spyOn(form, '$setPristine');
            spyOn(FormService, 'nextState');
            spyOn(FormService, 'submitChildForm');
            spyOn(EmployeeModel, 'calculateProfileCompleteness');

            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.hasError).toBeUndefined();

            employeeAdd.goToNextSection(isFormValid, form, route);

            expect(employeeAdd.hasError).toEqual(false);
            expect($state.go).toHaveBeenCalled();
            expect(form.$setPristine).toHaveBeenCalled();
            expect(FormService.nextState).toHaveBeenCalledWith($state.current.name, employeeAdd.formSteps);
            expect(FormService.submitChildForm).toHaveBeenCalledWith($state.current.name, form, employeeAdd.formSteps);
            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalledWith(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        });

        it('should not goToNextSection when form is invalid', () => {
            let isFormValid = false, form = 'form', route = 'route';
            spyOn($state, 'go');
            spyOn(FormService, 'submitChildForm');
            spyOn(EmployeeModel, 'calculateProfileCompleteness');

            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            expect(employeeAdd.hasError).toBeUndefined();

            employeeAdd.goToNextSection(isFormValid, form, route);

            expect(employeeAdd.hasError).toEqual(false);
            expect(FormService.submitChildForm).toHaveBeenCalled();
            expect($state.go).not.toHaveBeenCalledWith();
        });

        it('should goToPreviousSection', () => {
            spyOn($state, 'go');
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            spyOn(FormService, 'previousState').and.returnValue('test');

            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            employeeAdd.goToPreviousSection();

            expect($state.go).toHaveBeenCalledWith('test');
            expect(FormService.previousState).toHaveBeenCalledWith($state.current.name, employeeAdd.formSteps);
            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalledWith(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        });

        it('should not save if form is invalid', () => {
            spyOn(FormService, 'save');
            spyOn(FormService, 'hasInvalidChildForms').and.returnValue(true);
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            employeeAdd.save({});

            expect(employeeAdd.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
            expect(FormService.hasInvalidChildForms).toHaveBeenCalledWith($state, employeeAdd.formSteps);
        });

        it('should save if form is valid', () => {
            const form = 'form';
            spyOn(FormService, 'save').and.returnValue(Promise.resolve());
            spyOn(FormService, 'hasInvalidChildForms').and.returnValue(false);
            employeeAdd = new EmployeeAdd($state, $rootScope, EmployeeModel, FormService, fakeModal);

            employeeAdd.save(form);

            expect(employeeAdd.isSubmitting).toEqual(true);
            expect(FormService.save).toHaveBeenCalledWith(EmployeeModel, employeeAdd.employee, employeeAdd, form);
        });
    });
});
