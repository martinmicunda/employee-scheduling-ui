/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../core/constants/constants';
import Availability from './availability.js';

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


    describe('Controller', () => {
        let availability, AvailabilityService, collectionMock = 'collectionMock', scope = 'scope';

        beforeEach(inject((_AvailabilityService_) => {
            AvailabilityService = _AvailabilityService_;
        }));

        it('should have calendarData property', () => {
            spyOn(AvailabilityService, 'getCalendarData').and.returnValue(collectionMock);
            availability = new Availability(scope, AvailabilityService);

            expect(availability.calendarData).toEqual(collectionMock);
            expect(AvailabilityService.getCalendarData).toHaveBeenCalledWith(availability);
        });

        it('should have calendarConfig property', () => {
            spyOn(AvailabilityService, 'getCalendarConfig').and.returnValue(collectionMock);
            availability = new Availability(scope, AvailabilityService);

            expect(availability.calendarConfig).toEqual(collectionMock);
            expect(AvailabilityService.getCalendarConfig).toHaveBeenCalledWith(scope, 'me');
        });

        it('should have calendarViews property', () => {
            availability = new Availability(scope, AvailabilityService);

            expect(availability.calendarViews).toEqual([{id: 'me', label: 'My Availability'}, {id: 'everyone', label: 'Everyone\'s Availability'}]);
        });

        it('should have calendarView property', () => {
            availability = new Availability(scope, AvailabilityService);

            expect(availability.calendarView).toEqual('me');
        });

        it('should toggleView', () => {
            spyOn(AvailabilityService, 'getCalendarConfig').and.returnValue(collectionMock);
            spyOn(AvailabilityService, 'getCalendarData').and.returnValue(collectionMock);

            availability = new Availability(scope, AvailabilityService);

            expect(availability.calendarData).toEqual(collectionMock);
            expect(availability.calendarConfig).toEqual(collectionMock);
            expect(AvailabilityService.getCalendarData).toHaveBeenCalledWith(availability);
            expect(AvailabilityService.getCalendarConfig).toHaveBeenCalledWith(scope, 'me');
        });
    });
});
