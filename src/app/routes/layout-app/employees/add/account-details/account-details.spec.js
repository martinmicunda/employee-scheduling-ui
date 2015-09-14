/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import './account-details.js';

describe('EmployeeAddAccountDetails', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = `/employees/add/account-details`,
            state = 'app.employees.add.account-details',
            component = '<employee-account-details></employee-account-details>',
            currentState, $state;

        beforeEach(inject((_$state_) => {
            $state = _$state_;

            $state.go(state);
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should have component named `employee-account-details`', () => {
            expect(currentState.views['modal@'].template).toEqual(component);
        });
    });
});
