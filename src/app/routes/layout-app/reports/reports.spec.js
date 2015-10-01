/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../core/constants/constants';
import './reports.js';

describe('Schedule', () => {
    let component = '<reports></reports>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/reports',
            state = 'app.reports',
            currentState,
            $state, $injector;

        beforeEach(inject((_$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `reports`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should have access level set to '${ACCESS_LEVELS.admin}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.admin);
        });
    });

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element;

        beforeEach(inject((_$compile_, _$rootScope_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should contain reports component', () => {
            element = render();

            expect(element.controller('reports')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });
});
