/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import './bank-details.js';

describe('EmployeeEditBankDetails', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/employees/${id}/edit/bank-details`,
            state = 'app.employees.edit.bank-details',
            component = '<employee-bank-details></employee-bank-details>',
            currentState, $state;

        beforeEach(inject((_$state_) => {
            $state = _$state_;

            $state.go(state, {id: id});
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it('should have component named `employee-bank-details`', () => {
            expect(currentState.views['modal@'].template).toEqual(component);
        });
    });
});
