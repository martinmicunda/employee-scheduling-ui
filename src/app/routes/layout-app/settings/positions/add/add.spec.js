/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../../test/helpers/modal.js';
import PositionAdd from './add.js';

describe('PositionAdd', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/settings/positions/add',
            state = 'app.settings.positions.add',
            currentState, modalOptions,
            $state, $injector, $modal, $rootScope, PositionModel;

        beforeEach(inject((_$state_, _$modal_, _$rootScope_, _$injector_, _PositionModel_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            PositionModel = _PositionModel_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(PositionModel, 'initItem');
            spyOn($state, 'go');

            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should correctly show the position add modal', function () {
            $injector.invoke(currentState.onEnter);
            modalOptions.resolve.init[1](PositionModel);

            expect($modal.open).toHaveBeenCalled();
            expect(PositionModel.initItem).toHaveBeenCalled();

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toEqual('<modal-position></modal-position>');
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('PositionAdd');
        });

        it('should redirect to app.settings.positions route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.settings.positions');
        });
    });

    describe('Controller', () => {
        let positionAdd, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            positionAdd = new PositionAdd($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
