/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import MmEqualValidator from './equal-validator.js';

describe('MmEqualValidator', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    let $compile, $rootScope, scope, render, element, controller,
        component = `
              <form name="passwordForm">
                  <input type="password" name="password" ng-model="password"/>
                  <input type="password" name="newPassword" ng-model="newPassword" mm-equal-validator="password"/>
              </form>
            `;

    beforeEach(inject((_$compile_, _$rootScope_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();

        controller = MmEqualValidator.directiveFactory();

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

    it('should contain scope property', () => {
        element = render();

        expect(controller.scope).toEqual({
            mmEqualValidator: '='
        });
    });

    it('should pass validation when password and newPassword are equal', () => {
        const password = 'password', newPassword = 'password';
        element = render();

        scope.passwordForm.password.$setViewValue(password);
        scope.passwordForm.newPassword.$setViewValue(newPassword);
        scope.$digest();

        expect(scope.password).toEqual(password);
        expect(scope.newPassword).toEqual(newPassword);
        expect(scope.passwordForm.newPassword.$valid).toEqual(true);
    });

    it('should not pass validation when password and newPassword are not equal', () => {
        const password = 'password', newPassword = 'newPassword';
        element = render();

        scope.passwordForm.password.$setViewValue(password);
        scope.passwordForm.newPassword.$setViewValue(newPassword);
        scope.$digest();

        expect(scope.password).toEqual(password);
        expect(scope.newPassword).toBeUndefined();
        expect(scope.passwordForm.newPassword.$valid).toEqual(false);
    });

    it('should trigger $watch inside of link func when password value change', () => {
        const password = 'password', newPassword = 'password';
        element = render();
        spyOn(scope.passwordForm.newPassword, '$validate');

        scope.passwordForm.password.$setViewValue(password);
        scope.passwordForm.newPassword.$setViewValue(newPassword);

        expect(scope.passwordForm.newPassword.$validate).toHaveBeenCalled();
    });
});
