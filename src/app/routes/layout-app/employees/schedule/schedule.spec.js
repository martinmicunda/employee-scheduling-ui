/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {fakeModal} from '../../../../../../test/helpers/modal.js';
import EmployeeSchedule from './schedule.js';

describe('EmployeeSchedule', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/employees/${id}/schedule`,
            state = 'app.employees.schedule',
            currentState, modalOptions,
            $state, $injector, $modal, $rootScope;

        beforeEach(inject((_$state_, _$modal_, _$rootScope_, _$injector_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn($state, 'go');

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it('should correctly show the schedule modal', function () {
            $injector.invoke(currentState.onEnter);

            expect($modal.open).toHaveBeenCalled();

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toBeDefined();
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('EmployeeSchedule');
        });

        it('should redirect to app.employees route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.employees');
        });
    });

    describe('Controller', () => {
        let employeeSchedule;

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            employeeSchedule = new EmployeeSchedule(fakeModal);

            employeeSchedule.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });
    });
});
