/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import MmAccessLevel from './access-level.js';

describe('MmAccessLevel', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    let $compile, $rootScope, scope, render, element, controller, AuthenticationService, ngIfDirective,
        component = `
              <div>
                  <p mm-access-level="$root.ACCESS_LEVELS.admin">Test!</p>
              </div>
            `;

    beforeEach(inject((_$compile_, _$rootScope_, _AuthenticationService_, _ngIfDirective_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.ACCESS_LEVELS = {admin: ['test-role']};
        scope = $rootScope.$new();
        AuthenticationService = _AuthenticationService_;
        ngIfDirective = _ngIfDirective_;

        controller = MmAccessLevel.directiveFactory(ngIfDirective);

        render = () => {
            let element = angular.element(component);
            let compiledElement = $compile(element)(scope);
            $rootScope.$digest();

            return compiledElement;
        };
    }));

    it('should contain priority property', () => {
        element = render();

        expect(controller.priority).toEqual(ngIfDirective[0].priority);
    });

    it('should contain terminal property', () => {
        element = render();

        expect(controller.terminal).toEqual(ngIfDirective[0].terminal);
    });

    it('should contain restrict property', () => {
        element = render();

        expect(controller.restrict).toEqual(ngIfDirective[0].restrict);
    });

    it('should contain transclude property', () => {
        element = render();

        expect(controller.transclude).toEqual(ngIfDirective[0].transclude);
    });

    it('should keep element in DOM', () => {
        spyOn(AuthenticationService, 'isAuthorized').and.returnValue(true);
        element = render();

        expect(element.find('p').text()).toEqual('Test!');
        expect(AuthenticationService.isAuthorized).toHaveBeenCalledWith($rootScope.ACCESS_LEVELS.admin);
    });

    it('should remove element from DOM', () => {
        spyOn(AuthenticationService, 'isAuthorized').and.returnValue(false);
        element = render();

        expect(element.find('p')).toEqual({});
        expect(AuthenticationService.isAuthorized).toHaveBeenCalledWith($rootScope.ACCESS_LEVELS.admin);
    });

    it('should remove element from DOM when no scope is passed into directive', () => {
        spyOn(AuthenticationService, 'isAuthorized');
        component = `
              <div>
                  <p mm-access-level>Test!</p>
              </div>
            `;
        element = render();

        expect(element.find('p')).toEqual({});
    });
});
