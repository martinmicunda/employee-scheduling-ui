'use strict';

import './footer.js';

describe('Footer', () => {
    let component = '<footer></footer>';

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

        it('should contain copyright year', () => {
            element = render();
            let controller = element.controller('footer');
            let copyrightYear = new Date().getFullYear();
            let copyrightText = angular.element(element[0].querySelector('#copyright-year'));

            expect(controller.copyrightDate.getFullYear()).toEqual(copyrightYear);
            expect(copyrightText.text()).toEqual(copyrightYear.toString());
        });
    });
});
