/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular';
import 'angular-mocks';
import './alert-danger.js';

describe('AlertDanger', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element,
            component = '<alert-danger></alert-danger>', errorMessage = 'Error 500!';

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

        it('should contain alert-danger component', () => {
            element = render();

            expect(element.controller('alertDanger')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `Error!` alert title defined', () => {
            component = `<alert-danger has-error="true" error-message="'${errorMessage}'"></alert-danger>`;
            element = render();
            const errorAlertTitle = element.find('h4');

            expect(errorAlertTitle.text().trim()).toEqual('Error!');
        });

        it('should render and display the error message when there is error', () => {
            component = `<alert-danger has-error="true" error-message="'${errorMessage}'"></alert-danger>`;
            element = render();
            const alertDangerHtml = angular.element(element[0].querySelector('div[ng-if]'));
            const errorMessageText = angular.element(element[0].getElementsByClassName('ng-binding'));

            expect(alertDangerHtml[0]).toBeDefined();
            expect(errorMessageText.text().trim()).toEqual(errorMessage);
        });

        it('should not render and display the error message when there is no error', () => {
            component = `<alert-danger has-error="false" error-message="''"></alert-danger>`;
            element = render();
            const alertDangerHtml = angular.element(element[0].querySelector('div[ng-if]'));

            expect(alertDangerHtml[0]).not.toBeDefined();
        });
    });
});
