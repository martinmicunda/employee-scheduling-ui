/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {ACCESS_LEVELS} from '../../../../../core/constants/constants';
import './authorizations.js';

describe('EmployeeAddAuthorizations', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = `/employees/add/authorizations`,
            state = 'app.employees.add.authorizations',
            component = '<employee-authorizations></employee-authorizations>',
            currentState, $state;

        beforeEach(inject((_$state_) => {
            $state = _$state_;

            $state.go(state);
            currentState = $state.get(state);
        }));

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it('should have component named `employee-authorizations`', () => {
            expect(currentState.views['modal@'].template).toEqual(component);
        });

        it(`should have access level set to '${ACCESS_LEVELS.admin}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.admin);
        });
    });
});
