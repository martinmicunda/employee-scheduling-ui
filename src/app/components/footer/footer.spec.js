'use strict';

import 'angular-mocks';
import './footer.js';

describe('Footer', () => {
    let component = '<footer></footer>';

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

        it('should contain footer component', () => {
            element = render();

            expect(element.controller('footer')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should contain copyright link', () => {
            element = render();
            let copyrightLink = angular.element(element[0].querySelector('#footer div a'));

            expect(copyrightLink.attr('href')).toEqual('http://www.martinmicunda.com');
            expect(copyrightLink.attr('target')).toEqual('_blank');
        });

        it('should contain copyright text', () => {
            element = render();
            let copyrightYear = new Date().getFullYear();
            let copyrightText = angular.element(element[0].querySelector('#footer div'));

            expect(element.isolateScope().vm.copyrightDate.getFullYear()).toEqual(copyrightYear);
            expect(copyrightText.text().trim()).toEqual(`Copyright © ${copyrightYear.toString()} Martin Micunda. All rights reserved.`);
        });
    });
});
