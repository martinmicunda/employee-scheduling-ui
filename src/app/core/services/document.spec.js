/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import DocumentService from './document.js';

describe('DocumentService', () => {

    let documentService;

    beforeEach(() => {
        documentService = new DocumentService();
    });

    it(`should grant access for selected employees`, () => {
        let selectedEmployees = ['2'], employeesWithoutAccess = [{id: '1'}, {id: '2'}, {id: '3'}], employeesWithAccess = [];

        employeesWithAccess = documentService.grantAccess(selectedEmployees, employeesWithoutAccess, employeesWithAccess);

        expect(employeesWithoutAccess).toEqual([{id: '1'}, {id: '3'}]);
        expect(employeesWithAccess).toEqual([{id: '2'}]);
    });

    it(`should not grant access when employees are not selected `, () => {
        let selectedEmployees = [], employeesWithoutAccess = [{id: '1'}, {id: '2'}, {id: '3'}], employeesWithAccess = [];

        employeesWithAccess = documentService.grantAccess(selectedEmployees, employeesWithoutAccess, employeesWithAccess);

        expect(employeesWithoutAccess).toEqual([{id: '1'}, {id: '2'}, {id: '3'}]);
        expect(employeesWithAccess).toBeUndefined();
    });
});
