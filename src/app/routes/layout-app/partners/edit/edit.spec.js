/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import PartnerEdit from './edit.js';

describe('PartnerEdit', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/partners/${id}/edit`,
            state = 'app.partners.edit',
            currentState, modalOptions,
            $state, $modal, $injector, $rootScope, $stateParams, PartnerModel, ModalService;

        beforeEach(inject((_$state_, _$modal_, _$injector_, _$rootScope_, _$stateParams_, _PartnerModel_, _ModalService_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            $stateParams = {id: id};
            PartnerModel = _PartnerModel_;
            ModalService = _ModalService_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(PartnerModel, 'initItem');
            spyOn(ModalService, 'onSuccess');
            spyOn(ModalService, 'onError');
            spyOn($state, 'go');

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it('should correctly show the partner add modal', function () {
            $injector.invoke(currentState.onEnter, this, {$stateParams: $stateParams});
            modalOptions.resolve.init[1](PartnerModel);

            expect($modal.open).toHaveBeenCalled();
            expect(PartnerModel.initItem).toHaveBeenCalledWith(id);

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toEqual('<modal-partner></modal-partner>');
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('PartnerEdit');
        });

        it('should execute modal `then` block with success and failure functions', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the then callback

            expect($modal.open).toHaveBeenCalled();
            expect(ModalService.onSuccess).toHaveBeenCalled();
            expect(ModalService.onError).toHaveBeenCalledWith($modal, 'app.partners');
        });

        it('should redirect to `app.partners` route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.partners');
        });
    });

    describe('Controller', () => {
        let partnerEdit, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            partnerEdit = new PartnerEdit($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
