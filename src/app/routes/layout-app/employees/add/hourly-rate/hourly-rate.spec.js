/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import './hourly-rate.js';

describe('EmployeeAddHourlyRate', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = `/employees/add/hourly-rate`,
            state = 'app.employees.add.hourly-rate',
            component = '<employee-hourly-rate></employee-hourly-rate>',
            currentState, $state;

        beforeEach(inject((_$state_) => {
            $state = _$state_;

            $state.go(state);
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should have component named `employee-hourly-rate`', () => {
            expect(currentState.views['modal@'].template).toEqual(component);
        });
    });
});
