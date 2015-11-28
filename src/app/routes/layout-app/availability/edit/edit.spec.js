/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import AvailabilityEdit from './edit.js';

describe('AvailabilityEdit', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/availability/${id}/edit`,
            state = 'app.availability.edit',
            currentState, modalOptions,
            $state, $modal, $injector, $rootScope, $stateParams, AvailabilityModel, ModalService, mockData = 'data';

        beforeEach(inject((_$state_, _$modal_, _$injector_, _$rootScope_, _$stateParams_, _AvailabilityModel_, _ModalService_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            $stateParams = {id: id};
            AvailabilityModel = _AvailabilityModel_;
            ModalService = _ModalService_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(AvailabilityModel, 'setItem');
            spyOn(AvailabilityModel, 'getItemById').and.returnValue(mockData);
            spyOn($state, 'go');

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it('should correctly show the availability add modal', () => {
            $injector.invoke(currentState.onEnter, this, {$stateParams: $stateParams});
            modalOptions.resolve.init[1](AvailabilityModel);

            expect($modal.open).toHaveBeenCalled();
            expect(AvailabilityModel.getItemById).toHaveBeenCalledWith(id);
            expect(AvailabilityModel.setItem).toHaveBeenCalledWith(mockData);

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toEqual('<modal-availability></modal-availability>');
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('AvailabilityEdit');
        });

        it('should redirect to `app.availability` route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.availability');
        });
    });

    describe('Controller', () => {
        let partnerEdit, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            partnerEdit = new AvailabilityEdit($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
