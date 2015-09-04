/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Positions from './positions.js';

describe('Positions', () => {
    let component = '<positions></positions>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/settings/positions',
            state = 'app.settings.positions',
            currentState,
            $state, $injector, PositionModel;

        beforeEach(inject((_$state_, _$injector_, _PositionModel_) => {
            $state = _$state_;
            $injector = _$injector_;
            PositionModel = _PositionModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `positions`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should resolve 'init' for '${url}' state`, () => {
            spyOn(PositionModel, 'initCollection');

            $injector.invoke(currentState.resolve.init);

            expect(PositionModel.initCollection).toHaveBeenCalled();
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

        it('should contain positions component', () => {
            element = render();

            expect(element.controller('positions')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let positions, FormService, PositionModel, collectionMock = 'collectionMock';

        beforeEach(inject((_FormService_, _PositionModel_) => {
            FormService = _FormService_;
            PositionModel = _PositionModel_;
        }));

        it('should have positions property', () => {
            spyOn(PositionModel, 'getCollection').and.returnValue(collectionMock);
            positions = new Positions(FormService, PositionModel);

            expect(positions.positions).toEqual(collectionMock);
            expect(PositionModel.getCollection).toHaveBeenCalled();
        });

        it('should delete position', () => {
            let position = 'position';
            spyOn(FormService, 'delete');
            positions = new Positions(FormService, PositionModel);

            positions.deletePosition(position);
            expect(FormService.delete).toHaveBeenCalledWith(PositionModel, position, positions);
        });
    });
});
