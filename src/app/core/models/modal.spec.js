/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import ModalModel from './modal.js';

describe('ModalModel', () => {

    let modalModel;

    beforeEach(() => {
        modalModel = new ModalModel();
    });

    it(`should have model defined`, () => {
        expect(modalModel).toBeDefined();
    });
});

