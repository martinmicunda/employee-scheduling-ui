/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import MmColorHexValidator from './color-hex-validator.js';

describe('MmColorHexValidator', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    let $compile, $rootScope, scope, render, element, controller,
        component = `
              <form name="hexForm">
                  <input type="text" name="hex" ng-model="model.hex" required mm-color-hex-validator/>
              </form>
            `,
        validHex = [
            '#1f1f1F', '#AFAFAF', '#1AFFa1', '#222fff', '#F00'
        ],
        invalidHex = [
            '123456','#afafah','#123abce','aFaE3f',
            'F00','#afaf', '#F0h'
        ];

    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        controller = MmColorHexValidator.directiveFactory();

        render = () => {
            let element = angular.element(component);
            let compiledElement = $compile(element)(scope);
            $rootScope.$digest();

            return compiledElement;
        };
    }));

    it('should contain require property set to ngModel', () => {
        element = render();

        expect(controller.require).toEqual('ngModel');
    });

    it('should contain restrict property set to A', () => {
        element = render();

        expect(controller.restrict).toEqual('A');
    });

    it('should pass validation with valid HEX colors', () => {
        element = render();

        for (let hex of validHex) {
            scope.hexForm.hex.$setViewValue(hex);

            expect(scope.hexForm.hex.$valid).toBe(true);
        }
    });

    it('should not pass validation with invalid HEX colors', () => {
        element = render();

        for (let hex of invalidHex) {
            scope.hexForm.hex.$setViewValue(hex);

            expect(scope.hexForm.hex.$valid).toBe(false);
        }
    });
});
