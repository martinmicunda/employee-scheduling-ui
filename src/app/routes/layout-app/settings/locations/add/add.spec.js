/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../../test/helpers/modal.js';
import LocationAdd from './add.js';

describe('LocationAdd', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/settings/locations/add',
            state = 'app.settings.locations.add',
            currentState, modalOptions,
            $state, $injector, $modal, $rootScope, LocationModel;

        beforeEach(inject((_$state_, _$modal_, _$rootScope_, _$injector_, _LocationModel_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            LocationModel = _LocationModel_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(LocationModel, 'initItem');
            spyOn($state, 'go');

            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should correctly show the location add modal', function () {
            $injector.invoke(currentState.onEnter);
            modalOptions.resolve.init[1](LocationModel);

            expect($modal.open).toHaveBeenCalled();
            expect(LocationModel.initItem).toHaveBeenCalled();

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toEqual('<modal-location></modal-location>');
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('LocationAdd');
        });

        it('should redirect to app.settings.locations route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.settings.locations');
        });
    });

    describe('Controller', () => {
        let locationAdd, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            locationAdd = new LocationAdd($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
