/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {fakeModal} from '../../../../../../test/helpers/modal.js';
import EmployeeMessage from './message.js';

describe('EmployeeMessage', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/employees/${id}/message`,
            state = 'app.employees.message',
            currentState, modalOptions,
            $state, $modal, $injector, $rootScope, $stateParams, EmployeeModel, ModalService;

        beforeEach(inject((_$state_, _$modal_, _$injector_, _$rootScope_, _$stateParams_, _EmployeeModel_, _ModalService_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            $stateParams = {id: id};
            EmployeeModel = _EmployeeModel_;
            ModalService = _ModalService_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(EmployeeModel, 'initItem');
            spyOn($state, 'go');

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it('should correctly show the message modal', function () {
            $injector.invoke(currentState.onEnter, this, {$stateParams: $stateParams});
            modalOptions.resolve.init[1](EmployeeModel);

            expect($modal.open).toHaveBeenCalled();
            expect(EmployeeModel.initItem).toHaveBeenCalledWith(id);

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toBeDefined();
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('EmployeeMessage');
        });

        it('should redirect to `app.employees` route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.employees');
        });
    });

    describe('Controller', () => {
        let employeeMessage, FormService, EmployeeModel, itemMock = {email: 'itemMock'};

        beforeEach(inject((_FormService_, _EmployeeModel_) => {
            FormService = _FormService_;
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have email property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            employeeMessage = new EmployeeMessage(fakeModal, FormService, EmployeeModel);

            expect(employeeMessage.email).toEqual({to: itemMock.email});
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            employeeMessage = new EmployeeMessage(fakeModal, FormService, EmployeeModel);

            expect(employeeMessage.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            employeeMessage = new EmployeeMessage(fakeModal, FormService, EmployeeModel);

            expect(employeeMessage.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            employeeMessage = new EmployeeMessage(fakeModal, FormService, EmployeeModel);

            expect(employeeMessage.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            employeeMessage = new EmployeeMessage(fakeModal, FormService, EmployeeModel);

            employeeMessage.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            employeeMessage = new EmployeeMessage(fakeModal, FormService, EmployeeModel);

            employeeMessage.save(form);

            expect(employeeMessage.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true};
            employeeMessage = new EmployeeMessage(fakeModal, FormService, EmployeeModel);

            employeeMessage.save(form);

            expect(employeeMessage.isSubmitting).toEqual(true);
        });
    });
});
