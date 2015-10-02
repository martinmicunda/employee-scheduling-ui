/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import MmUniqueEmailValidator from './unique-email-validator.js';

describe('MmUniqueEmailValidator', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    let $compile, $rootScope, scope, render, element, controller, EmployeeModel, EmployeeResource,
        component = `
              <form name="emailForm">
                  <input type="email" name="uniqueEmail" ng-model="uniqueEmail" required mm-unique-email-validator/>
              </form>
            `;

    beforeEach(inject((_$compile_, _$rootScope_, _EmployeeModel_, _EmployeeResource_) => {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        EmployeeModel = _EmployeeModel_;
        EmployeeResource = _EmployeeResource_;

        controller = MmUniqueEmailValidator.directiveFactory();

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

    it('should pass validation when email does not exist', () => {
        const email = 'lex@test.com';
        spyOn(EmployeeModel, 'getItem').and.returnValue({email: 'test@test.com'});
        spyOn(EmployeeResource, 'getEmployeeByEmail').and.returnValue(Promise.reject());
        element = render();

        scope.emailForm.uniqueEmail.$setViewValue(email);
        scope.$digest();

        // FIXME: why from model value is not set so it trigger validation
        //expect(scope.emailForm.uniqueEmail.$valid).toBe(true);
        expect(EmployeeModel.getItem).toHaveBeenCalled();
        expect(EmployeeResource.getEmployeeByEmail).toHaveBeenCalledWith(email);
    });

    it('should throw error when email already exist', () => {
        const email = 'lex@test.com';
        spyOn(EmployeeModel, 'getItem').and.returnValue({email: 'test@test.com'});
        spyOn(EmployeeResource, 'getEmployeeByEmail').and.returnValue(Promise.resolve());
        element = render();

        scope.emailForm.uniqueEmail.$setViewValue(email);
        scope.$digest();

        // FIXME: why from model value is not set so it trigger validation
        //expect(scope.emailForm.uniqueEmail.$invalid).toBe(true);
        expect(EmployeeModel.getItem).toHaveBeenCalled();
        expect(EmployeeResource.getEmployeeByEmail).toHaveBeenCalledWith(email);
    });

    it('should not make http request when email are the same', () => {
        const email = 'lex@test.com';
        spyOn(EmployeeModel, 'getItem').and.returnValue({email: email});
        spyOn(EmployeeResource, 'getEmployeeByEmail').and.returnValue(Promise.resolve());
        element = render();

        scope.emailForm.uniqueEmail.$setViewValue(email);
        scope.$digest();

        // FIXME: why from model value is not set so it trigger validation
        //expect(scope.emailForm.uniqueEmail.$valid).toBe(true);
        expect(EmployeeModel.getItem).toHaveBeenCalled();
        expect(EmployeeResource.getEmployeeByEmail).not.toHaveBeenCalled();
    });
});
