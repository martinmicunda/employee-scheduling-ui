/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AccountDetails from './account-details.js';

describe('AccountDetails', () => {
    let component = '<account-details></account-details>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/account/account-details',
            state = 'app.account.account-details',
            currentState,
            $state, $injector;

        beforeEach(inject((_$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `account-details`', () => {
            expect(currentState.template).toEqual(component);
        });

        it(`should respond to '${url}' URL`, () => {
            expect($state.href(state)).toEqual(url);
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

        it('should contain account-details component', () => {
            element = render();

            expect(element.controller('accountDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let accountDetails, FormService, EmployeeModel, SettingModel, Upload,
            itemMock = {avatar: 'avatar', firstName: 'firstName', lastName: 'lastName', email: 'email', note: 'note'};

        beforeEach(inject((_FormService_, _EmployeeModel_, _SettingModel_, _Upload_) => {
            Upload = _Upload_;
            FormService = _FormService_;
            SettingModel = _SettingModel_;
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have employee property', () => {
            spyOn(Object, 'assign').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(accountDetails.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
            //expect(Object.assign).toHaveBeenCalledWith({}, itemMock); FIXME: it call spy on Object.assign for some reason
        });

        it('should have employeeCloned property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(accountDetails.employeeCloned).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(accountDetails.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(accountDetails.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(accountDetails.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should calculate profile completeness when controller is loaded', () => {
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();
        });

        it('should set default avatar image', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(SettingModel, 'getItem').and.returnValue({avatar: 'avatar-default'});
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(accountDetails.employee.avatar).toEqual(itemMock.avatar);

            accountDetails.removeAvatar();

            expect(accountDetails.employee.avatar).toEqual('avatar-default');
            expect(SettingModel.getItem).toHaveBeenCalled();
        });

        itAsync('should add new avatar image', () => {
            spyOn(Upload, 'dataUrl').and.returnValue(Promise.resolve('avatar-new'));
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            expect(accountDetails.employee.avatar).toEqual(itemMock.avatar);

            return accountDetails.addAvatar('file').then(() => {
                expect(accountDetails.employee.avatar).toEqual('avatar-new');
                expect(Upload.dataUrl).toHaveBeenCalledWith('file', true);
            });
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);

            accountDetails.save(form);

            expect(accountDetails.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(FormService, 'save').and.returnValue(Promise.resolve());
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService);
            accountDetails.employee.avatar = itemMock.avatar + '-updated';
            accountDetails.employee.firstName = itemMock.firstName + '-updated';
            accountDetails.employee.lastName = itemMock.lastName + '-updated';
            accountDetails.employee.email = itemMock.email + '-updated';
            accountDetails.employee.note = itemMock.note + '-updated';

            expect(accountDetails.employeeCloned.avatar).toEqual(itemMock.avatar);
            expect(accountDetails.employeeCloned.firstName).toEqual(itemMock.firstName);
            expect(accountDetails.employeeCloned.lastName).toEqual(itemMock.lastName);
            expect(accountDetails.employeeCloned.email).toEqual(itemMock.email);
            expect(accountDetails.employeeCloned.note).toEqual(itemMock.note);

            return accountDetails.save(form).then(() => {
                expect(accountDetails.isSubmitting).toEqual(true);
                expect(FormService.save).toHaveBeenCalledWith(EmployeeModel, accountDetails.employee, accountDetails, form);
                expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();

                expect(accountDetails.employeeCloned.avatar).toEqual(accountDetails.employee.avatar);
                expect(accountDetails.employeeCloned.firstName).toEqual(accountDetails.employee.firstName);
                expect(accountDetails.employeeCloned.lastName).toEqual(accountDetails.employee.lastName);
                expect(accountDetails.employeeCloned.email).toEqual(accountDetails.employee.email);
                expect(accountDetails.employeeCloned.note).toEqual(accountDetails.employee.note);
            });
        });
    });
});
