/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import MmScrollUp from './scroll-up.js';

describe('MmScrollUp', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    let $location, $compile, $rootScope, scope, render, element, controller,
        component = `<a href="#" mm-scroll-up="app">test</a>`;

    beforeEach(inject((_$compile_, _$rootScope_, _$location_) => {
        $location = _$location_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        controller = MmScrollUp.directiveFactory();

        render = () => {
            let element = angular.element(component);
            let compiledElement = $compile(element)(scope);
            $rootScope.$digest();

            return compiledElement;
        };
    }));

    it('should contain restrict property set to A', () => {
        element = render();

        expect(controller.restrict).toEqual('A');
    });

    xit('should call $location.hash function on click', () => {
        spyOn($location, 'hash');
        element = render();

        element.triggerHandler('click');

        expect($location.hash).toHaveBeenCalled();
    });
});
