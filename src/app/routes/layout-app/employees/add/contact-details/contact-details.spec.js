/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import './contact-details.js';

describe('EmployeeAddContactDetails', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = `/employees/add/contact-details`,
            state = 'app.employees.add.contact-details',
            component = '<employee-contact-details></employee-contact-details>',
            currentState, $state;

        beforeEach(inject((_$state_) => {
            $state = _$state_;

            $state.go(state);
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should have component named `employee-contact-details`', () => {
            expect(currentState.views['modal@'].template).toEqual(component);
        });
    });
});
