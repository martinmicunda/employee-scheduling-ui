/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Locations from './locations.js';

describe('Positions', () => {
    let component = '<locations></locations>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/settings/locations',
            state = 'app.settings.locations',
            currentState,
            $state, $injector, LocationModel;

        beforeEach(inject((_$state_, _$injector_, _LocationModel_) => {
            $state = _$state_;
            $injector = _$injector_;
            LocationModel = _LocationModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `locations`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should resolve 'init' for '${url}' state`, () => {
            spyOn(LocationModel, 'initCollection');

            $injector.invoke(currentState.resolve.init);

            expect(LocationModel.initCollection).toHaveBeenCalled();
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

        it('should contain locations component', () => {
            element = render();

            expect(element.controller('locations')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let locations, FormService, LocationModel, collectionMock = 'collectionMock';

        beforeEach(inject((_FormService_, _LocationModel_) => {
            FormService = _FormService_;
            LocationModel = _LocationModel_;
        }));

        it('should have locations property', () => {
            spyOn(LocationModel, 'getCollection').and.returnValue(collectionMock);
            locations = new Locations(FormService, LocationModel);

            expect(locations.locations).toEqual(collectionMock);
            expect(LocationModel.getCollection).toHaveBeenCalled();
        });

        it('should delete location', () => {
            let location = {default: false};
            spyOn(FormService, 'delete');
            locations = new Locations(FormService, LocationModel);

            locations.deleteLocation(location);
            expect(FormService.delete).toHaveBeenCalledWith(LocationModel, location, locations);
        });

        it('should not delete location and throw error message', () => {
            let location = {default: true};
            spyOn(FormService, 'delete');
            locations = new Locations(FormService, LocationModel);

            locations.deleteLocation(location);
            expect(locations.hasError).toEqual(true);
            expect(locations.errorMessage).toEqual(`The default location can't be deleted.`);
            expect(FormService.delete).not.toHaveBeenCalled();
        });
    });
});
