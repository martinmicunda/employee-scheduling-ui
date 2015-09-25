/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {fakeModal} from '../../../../test/helpers/modal.js';
import {MmModalReallyClick, MmModalReallyClickController} from './modal-really-click.js';

describe('MmModalReallyClick', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    let $compile, $rootScope, scope, render, element, controller, $modal, modalOptions, mmModalReallyClickController,
        component = `<a mm-modal-really-click="vm.deleteDocument()" mm-really-header="HEADER" mm-really-message="MESSAGE"></a>`;

    beforeEach(inject((_$compile_, _$rootScope_, _$modal_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        $modal = _$modal_;
        scope.vm = {deleteDocument: () => {}};
        controller = MmModalReallyClick.directiveFactory(fakeModal);

        spyOn($modal, 'open').and.callFake(function(options){
            modalOptions = options;

            return fakeModal;
        });

        render = () => {
            let element = angular.element(component);
            let compiledElement = $compile(element)(scope);
            $rootScope.$digest();

            return compiledElement;
        };
    }));

    it('should contain scope property', () => {
        element = render();

        expect(controller.scope).toEqual({mmModalReallyClick: '&'});
    });

    it('should contain restrict property set to A', () => {
        element = render();

        expect(controller.restrict).toEqual('A');
    });

    it('should display modal on click event', () => {
        element = render();
        element.triggerHandler('click');

        expect($modal.open).toHaveBeenCalled();

        expect(modalOptions.controllerAs).toEqual('vm');
        //expect(modalOptions.controller.name).toEqual('MmModalReallyClickController');
    });

    it('should have title defined', () => {
        element = render();
        element.triggerHandler('click');
        component = modalOptions.template;

        element = render();
        const title = element.find('h4');

        expect(title.text()).toEqual('HEADER');
    });

    it('should have message defined', () => {
        element = render();
        element.triggerHandler('click');
        component = modalOptions.template;

        element = render();
        const message = element.find('p');

        expect(message.text()).toEqual('MESSAGE');
    });

    describe('Close modal', () => {
        it('should have `×` label defined for close button', () => {
            element = render();
            element.triggerHandler('click');
            component = modalOptions.template;

            element = render();

            expect(angular.element(element[0].querySelector('button.close')).text()).toEqual('×');
        });

        it('should have `Cancel` label defined for close button', () => {
            element = render();
            element.triggerHandler('click');
            component = modalOptions.template;

            element = render();

            expect(angular.element(element[4].querySelector('button.btn-white')).text()).toEqual('Cancel');
        });

        it('should have `OK` label defined for ok button', () => {
            element = render();
            element.triggerHandler('click');
            component = modalOptions.template;

            element = render();

            expect(angular.element(element[4].querySelector('button.btn-white')).text()).toEqual('Cancel');
        });
    });

    it('should cancel modal', () => {
        spyOn(fakeModal, 'dismiss');
        mmModalReallyClickController = new MmModalReallyClickController(fakeModal);

        mmModalReallyClickController.cancel();

        expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
    });

    it('should close modal', () => {
        spyOn(fakeModal, 'close');
        mmModalReallyClickController = new MmModalReallyClickController(fakeModal);

        mmModalReallyClickController.ok();

        expect(fakeModal.close).toHaveBeenCalled();
    });
});
