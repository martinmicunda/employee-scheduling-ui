/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import PartnerAdd from './add.js';

describe('PartnerAdd', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/partners/add',
            state = 'app.partners.add',
            currentState, modalOptions,
            $state, $injector, $modal, $rootScope, PartnerModel;

        beforeEach(inject((_$state_, _$modal_, _$rootScope_, _$injector_, _PartnerModel_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            PartnerModel = _PartnerModel_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(PartnerModel, 'initItem');
            spyOn($state, 'go');

            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should correctly show the partner add modal', function () {
            $injector.invoke(currentState.onEnter);
            modalOptions.resolve.init[1](PartnerModel);

            expect($modal.open).toHaveBeenCalled();
            expect(PartnerModel.initItem).toHaveBeenCalled();

            expect(modalOptions.size).toEqual('md');
            expect(modalOptions.template).toEqual('<modal-partner></modal-partner>');
            expect(modalOptions.controllerAs).toEqual('vm');
            expect(modalOptions.controller.name).toEqual('PartnerAdd');
        });

        it('should redirect to app.partners route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.partners');
        });
    });

    describe('Controller', () => {
        let partnerAdd, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            partnerAdd = new PartnerAdd($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
