/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import templateError from './500.html!text';
import templateNotFound from './404.html!text';
import templateUnauthorized from './403.html!text';
import {ACCESS_LEVELS} from '../../core/constants/constants';
import './layout-error.js';

describe('ErrorRoute', () => {
    let $state, $compile, $rootScope, scope, render, element;

    beforeEach(angular.mock.module('ngDecorator'));

    beforeEach(inject((_$state_, _$compile_, _$rootScope_) => {
        $state = _$state_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
    }));

    describe('403', () => {
        let url = `/403`,
            state = '403',
            currentState;

        beforeEach(inject((_$state_) => {
            currentState = _$state_.get(state);

            render = () => {
                let element = angular.element(templateUnauthorized);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have 403 template defined`', () => {
            expect(currentState.template).toBeDefined();
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should have access level set to '${ACCESS_LEVELS.public}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.public);
        });

        it('should have `403` title defined', () => {
            element = render();
            const title = angular.element(element[0].querySelector('div.error-code'));

            expect(title.text().trim()).toEqual('403');
        });

        it('should have `403` message defined', () => {
            element = render();
            const message = angular.element(element[0].querySelector('div.error-message'));

            expect(message.text()).toEqual('Unauthorized...');
        });

        it('should have `403` description defined', () => {
            element = render();
            const desc = angular.element(element[0].querySelector('div.error-desc'));

            expect(desc.text().trim()).toEqual('Access forbidden!');
        });

        it('should have `403` button label defined', () => {
            element = render();
            const label = angular.element(element[0].querySelector('a.btn-success'));

            expect(label.text()).toEqual('Go Back to Home Page');
        });

        it('should have `root` home link defined', () => {
            element = render();
            const label = angular.element(element[0].querySelector('a.btn-success'));

            expect(label.attr('href')).toEqual('/home');
        });
    });

    describe('404', () => {
        let url = `/404`,
            state = '404',
            currentState;

        beforeEach(inject((_$state_) => {
            currentState = _$state_.get(state);

            render = () => {
                let element = angular.element(templateNotFound);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have 404 template defined`', () => {
            expect(currentState.template).toBeDefined();
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should have access level set to '${ACCESS_LEVELS.public}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.public);
        });

        it('should have `404` title defined', () => {
            element = render();
            const title = angular.element(element[0].querySelector('div.error-code'));

            expect(title.text().trim()).toEqual('404');
        });

        it('should have `404` message defined', () => {
            element = render();
            const message = angular.element(element[0].querySelector('div.error-message'));

            expect(message.text()).toEqual(`We couldn't find it...`);
        });

        it('should have `404` description defined', () => {
            element = render();
            const desc = angular.element(element[0].querySelector('div.error-desc'));

            expect(desc.text().trim().includes(`The page you're looking for doesn't exist.`)).toEqual(true);
            expect(desc.text().trim().includes(`Perhaps, there pages will help find what you're looking for.`)).toEqual(true);
        });

        it('should have `404` button label defined', () => {
            element = render();
            const label = angular.element(element[0].querySelector('a.btn-success'));

            expect(label.text()).toEqual('Go Back to Home Page');
        });

        it('should have `root` home link defined', () => {
            element = render();
            const label = angular.element(element[0].querySelector('a.btn-success'));

            expect(label.attr('href')).toEqual('/home');
        });
    });

    describe('500', () => {
        let url = `/500`,
            state = '500',
            currentState;

        beforeEach(inject((_$state_) => {
            currentState = _$state_.get(state);

            render = () => {
                let element = angular.element(templateError);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have 500 template defined`', () => {
            expect(currentState.template).toBeDefined();
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
        });

        it(`should have access level set to '${ACCESS_LEVELS.public}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.public);
        });

        it('should have `500` title defined', () => {
            element = render();
            const title = angular.element(element[0].querySelector('div.error-code'));

            expect(title.text().trim()).toEqual('500');
        });

        it('should have `500` message defined', () => {
            element = render();
            const message = angular.element(element[0].querySelector('div.error-message'));

            expect(message.text()).toEqual(`Oops...`);
        });

        it('should have `500` description defined', () => {
            element = render();
            const desc = angular.element(element[0].querySelector('div.error-desc'));

            expect(desc.text().trim().includes(`Something went terribly wrong.`)).toEqual(true);
            expect(desc.text().trim().includes(`We are fixing it. Please try again later.`)).toEqual(true);
        });

        it('should have `500` button label defined', () => {
            element = render();
            const label = angular.element(element[0].querySelector('a.btn-success'));

            expect(label.text()).toEqual('Go Back to Home Page');
        });

        it('should have `root` home link defined', () => {
            element = render();
            const label = angular.element(element[0].querySelector('a.btn-success'));

            expect(label.attr('href')).toEqual('/home');
        });
    });
});
