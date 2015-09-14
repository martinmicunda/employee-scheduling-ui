/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../../test/helpers/modal.js';
import PositionEdit from './edit.js';

describe('PositionEdit', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/settings/positions/${id}/edit`,
            state = 'app.settings.positions.edit',
            currentState, modalOptions,
            $state, $modal, $injector, $rootScope, $stateParams, PositionModel, ModalService;

        beforeEach(inject((_$state_, _$modal_, _$injector_, _$rootScope_, _$stateParams_, _PositionModel_, _ModalService_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            $stateParams = {id: id};
            PositionModel = _PositionModel_;
            ModalService = _ModalService_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(PositionModel, 'initItem');
            spyOn(ModalService, 'onSuccess');
            spyOn(ModalService, 'onError');
            spyOn($state, 'go');

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it('should correctly show the position add modal', function () {
            $injector.invoke(currentState.onEnter, this, {$stateParams: $stateParams});
            modalOptions.resolve.init[1](PositionModel);

            expect($modal.open).toHaveBeenCalled();
            expect(PositionModel.initItem).toHaveBeenCalledWith(id);

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toEqual('<modal-position></modal-position>');
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('PositionEdit');
        });

        it('should execute modal `then` block with success and failure functions', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the then callback

            expect($modal.open).toHaveBeenCalled();
            expect(ModalService.onSuccess).toHaveBeenCalled();
            expect(ModalService.onError).toHaveBeenCalledWith($modal, 'app.settings.positions');
        });

        it('should redirect to `app.settings.positions` route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.settings.positions');
        });
    });

    describe('Controller', () => {
        let positionEdit, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            positionEdit = new PositionEdit($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
