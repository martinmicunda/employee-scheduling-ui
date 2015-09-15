/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {PROFILE_COMPLETENESS_TYPES, USER_ROLES} from '../../../../core/constants/constants';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import EmployeeEdit from './edit.js';

describe('EmployeeEdit', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/employees/${id}/edit`,
            state = 'app.employees.edit',
            currentState, modalOptions,
            $q, $state, $modal, $injector, $rootScope, $stateParams, EmployeeModel, ModalService, SettingModel, LocationModel, PositionModel;

        beforeEach(inject((_$q_, _$state_, _$modal_, _$injector_, _$rootScope_, _EmployeeModel_, _PositionModel_, _SettingModel_, _LocationModel_, _ModalService_) => {
            $q = _$q_;
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            $stateParams = {id: id};
            PositionModel = _PositionModel_;
            EmployeeModel = _EmployeeModel_;
            SettingModel = _SettingModel_;
            ModalService = _ModalService_;
            LocationModel = _LocationModel_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(PositionModel, 'initCollection');
            spyOn(LocationModel, 'initCollection');
            spyOn(EmployeeModel, 'initItem');
            spyOn(SettingModel, 'initItem');
            spyOn(ModalService, 'onSuccess');
            spyOn(ModalService, 'onError');
            spyOn($state, 'go');
            spyOn($q, 'all');

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it('should correctly show the employee edit modal', function () {
            $injector.invoke(currentState.onEnter, this, {$stateParams: $stateParams});
            modalOptions.resolve.init[5]($q, PositionModel, EmployeeModel, SettingModel, LocationModel);

            expect($modal.open).toHaveBeenCalled();
            expect(PositionModel.initCollection).toHaveBeenCalled();
            expect(LocationModel.initCollection).toHaveBeenCalled();
            expect(EmployeeModel.initItem).toHaveBeenCalledWith(id);
            expect(SettingModel.initItem).toHaveBeenCalledWith('app');
            expect($q.all).toHaveBeenCalled();

            expect(modalOptions.size).toEqual('lg');
            expect(modalOptions.template).toBeDefined();
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('EmployeeEdit');
        });

        it('should execute modal `then` block with success and failure functions', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the then callback

            expect($modal.open).toHaveBeenCalled();
            expect(ModalService.onSuccess).toHaveBeenCalled();
            expect(ModalService.onError).toHaveBeenCalledWith($modal, 'app.employees');
        });

        it('should redirect to `app.employees` route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.employees');
        });
    });

    describe('Controller', () => {
        let $state, employeeEdit, FormService, EmployeeModel, itemMock = {firstName: 'firstName', lastName: 'lastName', avatar: 'avatar'};

        beforeEach(inject((_$state_, _FormService_, _EmployeeModel_) => {
            $state = _$state_;
            FormService = _FormService_;
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have name property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.name).toEqual(`${itemMock.firstName} ${itemMock.lastName}`);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have avatar property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.avatar).toEqual(itemMock.avatar);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.result).toEqual(null);
        });

        it('should have profileCompletenessType property', () => {
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.profileCompletenessType).toEqual(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(itemMock);
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should have formSteps property', () => {
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.formSteps).toEqual([
                {route: 'app.employees.edit.account-details', formName: 'employeeAccountDetailsForm', valid: false},
                {route: 'app.employees.edit.contact-details', formName: 'employeeContactDetailsForm', valid: true},
                {route: 'app.employees.edit.bank-details', formName: 'employeeBankDetailsForm', valid: true},
                {route: 'app.employees.edit.hourly-rate', formName: 'employeeHourlyRateForm', valid: false},
                {route: 'app.employees.edit.authorizations', formName: 'employeeAuthorizationsForm', valid: true},
                {route: 'app.employees.edit.password', formName: 'employeePasswordForm', valid: true}
            ]);
        });

        it('should have calculate profile completeness when controller is initialise', () => {
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalledWith(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            employeeEdit.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should goToNextSection when form is valid', () => {
            let isFormValid = true, form = 'form', route = 'route';
            employeeEdit.formSteps = 'formSteps';
            spyOn(FormService, 'submitChildForm');
            spyOn($state, 'go');
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.hasError).toBeUndefined();

            employeeEdit.goToNextSection(isFormValid, form, route);

            expect(employeeEdit.hasError).toEqual(false);
            expect($state.go).toHaveBeenCalledWith(route);
            expect(FormService.submitChildForm).toHaveBeenCalledWith($state.current.name, form, employeeEdit.formSteps);
        });

        it('should not goToNextSection when form is invalid', () => {
            let isFormValid = false, form = 'form', route = 'route';
            spyOn($state, 'go');
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.hasError).toBeUndefined();

            employeeEdit.goToNextSection(isFormValid, form, route);

            expect($state.go).not.toHaveBeenCalledWith();
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            employeeEdit.save(form);

            expect(employeeEdit.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true}, itemMock2 = {firstName: 'firstName2', lastName: 'lastName2', avatar: 'avatar2'};
            spyOn(FormService, 'save').and.returnValue(Promise.resolve());
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock2);
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            employeeEdit.avatar = itemMock.avatar;
            employeeEdit.name = `${itemMock.firstName} ${itemMock.lastName}`;

            return employeeEdit.save(form).then(() => {
                expect(employeeEdit.isSubmitting).toEqual(true);
                expect(FormService.save).toHaveBeenCalledWith(EmployeeModel, employeeEdit.employee, employeeEdit, form);
                expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalledWith(PROFILE_COMPLETENESS_TYPES.EMPLOYEE);

                expect(employeeEdit.avatar).toEqual(itemMock2.avatar);
                expect(employeeEdit.name).toEqual(`${itemMock2.firstName} ${itemMock2.lastName}`);
            });
        });

        itAsync('should execute final block when form is valid', () => {
            let form = {$valid: true};
            spyOn(fakeModal, 'dismiss');
            spyOn(FormService, 'save').and.returnValue(Promise.resolve());
            employeeEdit = new EmployeeEdit($state, fakeModal, EmployeeModel, FormService);

            expect(employeeEdit.cancel).toBeDefined();

            let save = employeeEdit.save(form);

            expect(employeeEdit.cancel).not.toBeDefined();

            return save.then(() => {
                expect(employeeEdit.cancel).toBeDefined();

                employeeEdit.cancel();

                expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
            });
        });
    });
});
