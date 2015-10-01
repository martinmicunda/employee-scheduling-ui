/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../core/constants/constants';
import './availability.js';

describe('Availability', () => {
    let component = '<availability></availability>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/availability',
            state = 'app.availability',
            currentState,
            $state, $injector;

        beforeEach(inject((_$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `availability`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should have access level set to '${ACCESS_LEVELS.employee}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.employee);
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

        it('should contain availability component', () => {
            element = render();

            expect(element.controller('availability')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });
});
