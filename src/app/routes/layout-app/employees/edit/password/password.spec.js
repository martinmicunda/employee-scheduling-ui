/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS} from '../../../../../core/constants/constants';
import EmployeeEditPassword from './password.js';

describe('EmployeeEditPassword', () => {
    let component = '<password></password>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let id = '1',
            url = `/employees/${id}/edit/password`,
            state = 'app.employees.edit.password',
            currentState,
            $state, $injector;

        beforeEach(inject((_$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `password`', () => {
            expect(currentState.views['modal@'].template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state, {id: id})).toEqual(url);
        });

        it(`should have access level set to '${ACCESS_LEVELS.admin}'`, () => {
            expect(currentState.data.access).toEqual(ACCESS_LEVELS.admin);
        });
    });

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

        it('should contain password component', () => {
            element = render();

            expect(element.controller('password')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `Password` title defined', () => {
            element = render();
            const title = element.find('legend');

            expect(title.text()).toEqual('Password');
        });

        it('should have `Password` label defined', () => {
            element = render();
            const title = element.find('label');

            expect(title.text()).toEqual('Password');
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        it('should have `alert-success` component defined with attributes `success-message` and `has-success`', () => {
            element = render();

            expect(element.find('alert-success')[0]).toBeDefined();
            expect(element.find('alert-success').attr('success-message')).toEqual('vm.successMessage');
            expect(element.find('alert-success').attr('has-success')).toEqual('vm.hasSuccess');
        });

        describe('Link', () => {
            it('should contain Back to Login label', () => {
                element = render();
                const nav = angular.element(element[0].querySelector('.form-group > div a'));

                expect(nav.text().trim()).toEqual('Reset password?');
            });

            it('should call `vm.resetPassword` when upload photo button is clicked', function () {
                element = render();
                spyOn(element.isolateScope().vm, 'resetPassword');

                angular.element(element[0].querySelector('.form-group > div a')).triggerHandler('click');

                expect(element.isolateScope().vm.resetPassword).toHaveBeenCalled();
            });

            it('should hide form when password was reset successfully', () => {
                element = render();
                element.isolateScope().vm.hasSuccess = true;
                scope.$digest();

                const form = angular.element(element[0].querySelector('.form-group'));

                expect(form.hasClass('ng-hide')).toEqual(true);
            });

            it('should hide forgot password label and display spinner when resetPassword is clicked', () => {
                element = render();
                element.isolateScope().vm.isSubmitting = true;
                scope.$digest();

                const label = angular.element(element[0].querySelector('div > p'));
                const spinner = angular.element(element[0].querySelector('.spinner-small')).parent();

                expect(label.hasClass('ng-hide')).toEqual(true);
                expect(spinner.hasClass('ng-hide')).toEqual(false);
            });
        });
    });

    describe('Controller', () => {
        let employeeEditPassword, EmployeeModel, itemMock = {email: 'email'}, AuthenticationResource, FormService;

        beforeEach(inject((_EmployeeModel_, _AuthenticationResource_, _FormService_) => {
            EmployeeModel = _EmployeeModel_;
            AuthenticationResource = _AuthenticationResource_;
            FormService = _FormService_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            employeeEditPassword = new EmployeeEditPassword(EmployeeModel, AuthenticationResource, FormService);

            expect(employeeEditPassword.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            employeeEditPassword = new EmployeeEditPassword(EmployeeModel, AuthenticationResource, FormService);

            expect(employeeEditPassword.isSubmitting).toEqual(null);
        });

        describe('resetPassword()', () => {
            it('should set isSubmitting to true when resetPassword is clicked', () => {
                employeeEditPassword = new EmployeeEditPassword(EmployeeModel, AuthenticationResource, FormService);

                employeeEditPassword.resetPassword();

                expect(employeeEditPassword.isSubmitting).toEqual(true);
            });

            itAsync('should save form with successfully request', () => {
                spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
                spyOn(FormService, 'onSuccess');
                spyOn(AuthenticationResource, 'forgotPassword').and.returnValue(Promise.resolve());
                employeeEditPassword = new EmployeeEditPassword(EmployeeModel, AuthenticationResource, FormService);

                return employeeEditPassword.resetPassword().then(() => {
                    expect(AuthenticationResource.forgotPassword).toHaveBeenCalledWith(itemMock.email);
                    expect(FormService.onSuccess).toHaveBeenCalledWith(employeeEditPassword);
                    expect(employeeEditPassword.hasSuccess).toEqual(true);
                    expect(employeeEditPassword.successMessage).toEqual('We have emailed instructions to this user on how to reset their password.');
                });
            });

            itAsync('should not save form with failure request', () => {
                let response = {status: 500};
                spyOn(FormService, 'onFailure');
                spyOn(AuthenticationResource, 'forgotPassword').and.returnValue(Promise.reject(response));
                employeeEditPassword = new EmployeeEditPassword(EmployeeModel, AuthenticationResource, FormService);

                return employeeEditPassword.resetPassword().then(() => {
                    expect(employeeEditPassword.hasSuccess).toEqual(false);
                    expect(FormService.onFailure).toHaveBeenCalledWith(employeeEditPassword, response);
                });
            });
        });
    });
});
