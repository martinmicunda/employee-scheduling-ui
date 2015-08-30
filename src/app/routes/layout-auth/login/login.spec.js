/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Login from './login.js';

describe('AuthRoute', () => {
    let $state,
        url = '/login',
        state = 'auth.login',
        currentState;

    beforeEach(angular.mock.module('ngDecorator'));

    beforeEach(inject((_$state_) => {
        $state = _$state_;

        currentState = $state.get(state);
    }));

    it(`should respond to '${url}' URL`, () => {
        expect($state.href(state)).toEqual(url);
    });

    it('should have template to be defined', () => {
        expect(currentState.template).toBeDefined();
    });

    it('should redirect to app.employees state after successful login', () => {
        spyOn($state, 'go');
        let login = new Login($state);

        login.login();

        expect($state.go).toHaveBeenCalledWith('app.employees');
    });
});
