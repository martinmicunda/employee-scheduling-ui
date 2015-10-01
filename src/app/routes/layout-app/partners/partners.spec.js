/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../core/constants/constants';
import Partners from './partners.js';

describe('Partners', () => {
    let component = '<partners></partners>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/partners',
            state = 'app.partners',
            currentState,
            $state, $injector, PartnerModel;

        beforeEach(inject((_$state_, _$injector_, _PartnerModel_) => {
            $state = _$state_;
            $injector = _$injector_;
            PartnerModel = _PartnerModel_;

            currentState = $state.get(state);
        }));

        it('should have component named `partners`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should resolve 'init' for '${url}' state`, () => {
            spyOn(PartnerModel, 'initCollection');

            $injector.invoke(currentState.resolve.init);

            expect(PartnerModel.initCollection).toHaveBeenCalled();
        });

        it(`should have access level set to '${ACCESS_LEVELS.manager}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.manager);
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

        it('should contain partners component', () => {
            element = render();

            expect(element.controller('partners')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let partners, FormService, PartnerModel, collectionMock = 'collectionMock';

        beforeEach(inject((_FormService_, _PartnerModel_) => {
            FormService = _FormService_;
            PartnerModel = _PartnerModel_;
        }));

        it('should have partners property', () => {
            spyOn(PartnerModel, 'getCollection').and.returnValue(collectionMock);
            partners = new Partners(FormService, PartnerModel);

            expect(partners.partners).toEqual(collectionMock);
            expect(PartnerModel.getCollection).toHaveBeenCalled();
        });

        it('should delete partner', () => {
            let partner = 'partner';
            spyOn(FormService, 'delete');
            partners = new Partners(FormService, PartnerModel);

            partners.deletePartner(partner);
            expect(FormService.delete).toHaveBeenCalledWith(PartnerModel, partner, partners);
        });
    });
});
