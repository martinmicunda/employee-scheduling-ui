/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import AvailabilityAdd from './add.js';

describe('AvailabilityAdd', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/availability/add',
            state = 'app.availability.add',
            currentState, modalOptions,
            $state, $injector, $modal, $rootScope, AvailabilityModel, localStorageService, mockData = 'data';

        beforeEach(inject((_$state_, _$modal_, _$rootScope_, _$injector_, _AvailabilityModel_, _localStorageService_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            AvailabilityModel = _AvailabilityModel_;
            localStorageService = _localStorageService_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(AvailabilityModel, 'setItem');
            spyOn(localStorageService, 'get').and.returnValue(mockData);
            spyOn($state, 'go');

            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should correctly show the availability add modal', function () {
            $injector.invoke(currentState.onEnter);
            modalOptions.resolve.init[2](AvailabilityModel, localStorageService);

            expect($modal.open).toHaveBeenCalled();
            expect(AvailabilityModel.setItem).toHaveBeenCalledWith(mockData);
            expect(localStorageService.get).toHaveBeenCalledWith('availability');

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toEqual('<modal-availability></modal-availability>');
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('AvailabilityAdd');
        });

        it('should redirect to app.availability route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.availability');
        });
    });

    describe('Controller', () => {
        let partnerAdd, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            partnerAdd = new AvailabilityAdd($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
