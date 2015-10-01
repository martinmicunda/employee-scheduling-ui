/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import Header from './header.js';

describe('Header', () => {
    let component = '<header></header>';

    beforeEach(angular.mock.module('ngDecorator'));

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

        it('should contain header component', () => {
            element = render();

            expect(element.controller('header')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let $state, AuthenticationService;

        beforeEach(inject((_$state_, _AuthenticationService_) => {
            $state = _$state_;
            AuthenticationService = _AuthenticationService_;
        }));

        itAsync('should redirect to auth.login state after successful logout', () => {
            spyOn($state, 'go');
            spyOn(AuthenticationService, 'logout').and.returnValue(Promise.resolve());
            let header = new Header($state, AuthenticationService);

            return header.logout().then(() => {
                expect($state.go).toHaveBeenCalledWith('auth.login');
                expect(AuthenticationService.logout).toHaveBeenCalled();
            });
        });
    });
});
