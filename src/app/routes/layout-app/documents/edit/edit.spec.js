/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import DocumentEdit from './edit.js';

describe('DocumentEdit', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/documents/${id}/edit`,
            state = 'app.documents.edit',
            currentState, modalOptions,
            $state, $modal, $injector, $rootScope, $stateParams, DocumentModel, ModalService, EmployeeModel;

        beforeEach(inject((_$state_, _$modal_, _$injector_, _$rootScope_, _$stateParams_, _DocumentModel_, _ModalService_, _EmployeeModel_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            $stateParams = {id: id};
            DocumentModel = _DocumentModel_;
            EmployeeModel = _EmployeeModel_;
            ModalService = _ModalService_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(DocumentModel, 'initItem');
            spyOn(EmployeeModel, 'initCollection');
            spyOn(ModalService, 'onSuccess');
            spyOn(ModalService, 'onError');
            spyOn($state, 'go');

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        itAsync('should correctly show the document add modal', function () {
            $injector.invoke(currentState.onEnter, this, {$stateParams: $stateParams});
            return modalOptions.resolve.init[2](DocumentModel, EmployeeModel).then(() => {
                expect($modal.open).toHaveBeenCalled();
                expect(DocumentModel.initItem).toHaveBeenCalledWith(id);
                expect(EmployeeModel.initCollection).toHaveBeenCalled();

                expect(modalOptions.size).toEqual('md');
                expect(modalOptions.template).toEqual('<modal-document></modal-document>');
                expect(modalOptions.controllerAs).toEqual('vm');
                expect(modalOptions.controller.name).toEqual('DocumentEdit');
            });
        });

        it('should execute modal `then` block with success and failure functions', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the then callback

            expect($modal.open).toHaveBeenCalled();
            expect(ModalService.onSuccess).toHaveBeenCalled();
            expect(ModalService.onError).toHaveBeenCalledWith($modal, 'app.documents');
        });

        it('should redirect to `app.documents` route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.documents');
        });
    });

    describe('Controller', () => {
        let documentEdit, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            documentEdit = new DocumentEdit($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
