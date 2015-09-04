/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {fakeModal} from '../../../../test/helpers/modal.js';
import ModalService from './modal.js';

describe('ModalService', () => {

    let modalService, $state, state = 'state';

    beforeEach(() => {
        $state = {
            go: function() {}
        };
        spyOn($state, 'go');

        modalService = new ModalService($state);
    });

    it(`should return empty function when onSuccess function is called`, () => {
        expect(modalService.onSuccess()()).toBeUndefined();
    });

    it(`should redirect to state when onFinal function is called`, () => {
        modalService.onFinal(state)();

        expect($state.go).toHaveBeenCalledWith(state);
    });

    describe('onError', () => {
        it(`should not open modal if there is no status error`, () => {
            let error = {};
            spyOn(fakeModal, 'open').and.returnValue(fakeModal);

            modalService.onError(fakeModal, state)(error);

            expect(fakeModal.open).not.toHaveBeenCalled();
        });

        it(`should open modal if there is status error`, () => {
            let error = {status: 'error'};
            spyOn(fakeModal, 'open').and.returnValue(fakeModal);

            modalService.onError(fakeModal, state)(error);

            expect(fakeModal.open).toHaveBeenCalled();
        });

        it(`should redirect to different route when finally block is executed`, () => {
            let error = {status: 'error'}, route = 'route';
            spyOn(fakeModal, 'open').and.returnValue(fakeModal);

            modalService.onError(fakeModal, route)(error);

            fakeModal.finally(); // trigger the result.finally callback

            expect(fakeModal.open).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith(route);
        });
    });
});
