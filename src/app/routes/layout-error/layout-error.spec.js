/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './layout-error.js';

describe('ErrorRoute', () => {
    let $state;

    beforeEach(angular.mock.module('ngDecorator'));

    beforeEach(inject((_$state_) => {
        $state = _$state_;
    }));

    describe('403', () => {
        let url = `/403`,
            state = '403',
            currentState;

        beforeEach(inject((_$state_) => {
            currentState = _$state_.get(state);
        }));

        it('should have 403 template defined`', () => {
            expect(currentState.template).toBeDefined();
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });
    });

    describe('404', () => {
        let url = `/404`,
            state = '404',
            currentState;

        beforeEach(inject((_$state_) => {
            currentState = _$state_.get(state);
        }));

        it('should have 404 template defined`', () => {
            expect(currentState.template).toBeDefined();
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });
    });

    describe('500', () => {
        let url = `/500`,
            state = '500',
            currentState;

        beforeEach(inject((_$state_) => {
            currentState = _$state_.get(state);
        }));

        it('should have 500 template defined`', () => {
            expect(currentState.template).toBeDefined();
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });
    });
});
