/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../../../test/helpers/modal.js';
import DocumentAdd from './add.js';

describe('DocumentAdd', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/documents/add',
            state = 'app.documents.add',
            currentState, modalOptions,
            $state, $injector, $modal, $rootScope, DocumentModel, ModalService, EmployeeModel;

        beforeEach(inject((_$state_, _$modal_, _$rootScope_, _$injector_, _DocumentModel_, _ModalService_, _EmployeeModel_) => {
            $state = _$state_;
            $modal = _$modal_;
            $injector = _$injector_;
            $rootScope = _$rootScope_;
            ModalService = _ModalService_;
            DocumentModel = _DocumentModel_;
            EmployeeModel = _EmployeeModel_;

            spyOn($modal, 'open').and.callFake(function(options){
                modalOptions = options;

                return fakeModal;
            });
            spyOn(DocumentModel, 'initItem');
            spyOn(EmployeeModel, 'initCollection');
            spyOn($state, 'go');

            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        itAsync('should correctly show the document add modal', function () {
            $injector.invoke(currentState.onEnter);
            return modalOptions.resolve.init[2](DocumentModel, EmployeeModel).then(() => {
                expect($modal.open).toHaveBeenCalled();
                expect(DocumentModel.initItem).toHaveBeenCalled();
                expect(EmployeeModel.initCollection).toHaveBeenCalled();

                expect(modalOptions.size).toEqual('md');
                expect(modalOptions.template).toEqual('<modal-document></modal-document>');
                expect(modalOptions.controllerAs).toEqual('vm');
                expect(modalOptions.controller.name).toEqual('DocumentAdd');
            });
        });

        it('should redirect to app.documents route when finally block is executed', () => {
            $injector.invoke(currentState.onEnter);

            fakeModal.finally(); // trigger the result.finally callback

            expect($modal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('app.documents');
        });
    });

    describe('Controller', () => {
        let documentAdd, ModalModel, $modalInstanceMock = '$modalInstanceMock';

        beforeEach(inject((_ModalModel_) => {
            ModalModel = _ModalModel_;
        }));

        it('should store $modalInstance into modal model', () => {
            spyOn(ModalModel, 'setItem');

            documentAdd = new DocumentAdd($modalInstanceMock, ModalModel);

            expect(ModalModel.setItem).toHaveBeenCalledWith($modalInstanceMock);
        });
    });
});
