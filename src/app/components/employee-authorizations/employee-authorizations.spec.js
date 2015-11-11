/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {EMPLOYEE_PROFILE_STATUSES, USER_ROLES} from '../../core/constants/constants';
//import employee from '../../core/resources/employee/fixtures/employee_1.json!json';
import EmployeeAuthorizations from './employee-authorizations.js';

describe('EmployeeAuthorizations', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    //describe('Component', () => {
    //    let $compile, $rootScope, scope, render, element, EmployeeModel,
    //        component = '<employee-authorizations></employee-authorizations>';
    //
    //    beforeEach(inject((_$compile_, _$rootScope_, _EmployeeModel_) => {
    //        $compile = _$compile_;
    //        $rootScope = _$rootScope_;
    //        scope = $rootScope.$new();
    //        EmployeeModel = _EmployeeModel_;
    //
    //        spyOn(EmployeeModel, 'getItem').and.returnValue(Object.assign({},employee));
    //
    //        render = () => {
    //            let element = angular.element(component);
    //            let compiledElement = $compile(element)(scope);
    //            $rootScope.$digest();
    //
    //            return compiledElement;
    //        };
    //    }));
    //
    //    it('should have `employee-authorizations` component', () => {
    //        element = render();
    //
    //        expect(element.controller('employeeAuthorizations')).toBeDefined();
    //        expect(element['0']).not.toEqual(component);
    //    });
    //
    //    it('should have `Contact Details` title defined', () => {
    //        element = render();
    //        const title = element.find('legend');
    //
    //        expect(title.text()).toEqual('Contact Details');
    //    });
    //
    //    describe('Form fields', () => {
    //        const CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg';
    //
    //        describe('phoneNumber', () => {
    //            it('should have `Phone Number` label defined', () => {
    //                element = render();
    //                const parentElement = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]')).parent().parent();
    //
    //                expect(parentElement.find('label').text()).toEqual('Phone Number');
    //            });
    //
    //            it('should show `phoneNumber` maxlength error message', () => {
    //                element = render();
    //                const inputField = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]'));
    //                inputField.val(CHARACTERS_61);
    //                inputField.triggerHandler('input');
    //                element.triggerHandler('submit');
    //                element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
    //                scope.$digest();
    //
    //                const errorMessage = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"] ~ div > div[ng-message="maxlength"]'));
    //
    //                expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
    //            });
    //        });
    //
    //        describe('address', () => {
    //            it('should have `Address` label defined', () => {
    //                element = render();
    //                const parentElement = angular.element(element[0].querySelector('input[name="address"][type="text"]')).parent().parent();
    //
    //                expect(parentElement.find('label').text()).toEqual('Address');
    //            });
    //
    //            it('should show `address` maxlength error message', () => {
    //                element = render();
    //                const inputField = angular.element(element[0].querySelector('input[name="address"][type="text"]'));
    //                inputField.val(CHARACTERS_61);
    //                inputField.triggerHandler('input');
    //                element.triggerHandler('submit');
    //                element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
    //                scope.$digest();
    //
    //                const errorMessage = angular.element(element[0].querySelector('input[name="address"][type="text"] ~ div > div[ng-message="maxlength"]'));
    //
    //                expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
    //            });
    //        });
    //
    //        describe('city', () => {
    //            it('should have `City` label defined', () => {
    //                element = render();
    //                const parentElement = angular.element(element[0].querySelector('input[name="city"][type="text"]')).parent().parent();
    //
    //                expect(parentElement.find('label').text()).toEqual('City');
    //            });
    //
    //            it('should show `city` maxlength error message', () => {
    //                element = render();
    //                const inputField = angular.element(element[0].querySelector('input[name="city"][type="text"]'));
    //                inputField.val(CHARACTERS_61);
    //                inputField.triggerHandler('input');
    //                element.triggerHandler('submit');
    //                element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
    //                scope.$digest();
    //
    //                const errorMessage = angular.element(element[0].querySelector('input[name="city"][type="text"] ~ div > div[ng-message="maxlength"]'));
    //
    //                expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
    //            });
    //        });
    //
    //        describe('city', () => {
    //            it('should have `Zip Code` label defined', () => {
    //                element = render();
    //                const parentElement = angular.element(element[0].querySelector('input[name="zipCode"][type="text"]')).parent().parent();
    //
    //                expect(parentElement.find('label').text()).toEqual('Zip Code');
    //            });
    //
    //            it('should show `zipCode` maxlength error message', () => {
    //                element = render();
    //                const inputField = angular.element(element[0].querySelector('input[name="zipCode"][type="text"]'));
    //                inputField.val(CHARACTERS_61);
    //                inputField.triggerHandler('input');
    //                element.triggerHandler('submit');
    //                element.isolateScope().employeeContactDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
    //                scope.$digest();
    //
    //                const errorMessage = angular.element(element[0].querySelector('input[name="zipCode"][type="text"] ~ div > div[ng-message="maxlength"]'));
    //
    //                expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
    //            });
    //        });
    //    });
    //
    //    it('should submit the form', function () {
    //        element = render();
    //
    //        const phoneNumberInputField = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]'));
    //        phoneNumberInputField.val(employee.phoneNumber);
    //        phoneNumberInputField.triggerHandler('input');
    //
    //        const addressInputField = angular.element(element[0].querySelector('input[name="address"][type="text"]'));
    //        addressInputField.val(employee.address);
    //        addressInputField.triggerHandler('input');
    //
    //        const cityInputField = angular.element(element[0].querySelector('input[name="city"][type="text"]'));
    //        cityInputField.val(employee.city);
    //        cityInputField.triggerHandler('input');
    //
    //        const zipCodeInputField = angular.element(element[0].querySelector('input[name="zipCode"][type="text"]'));
    //        zipCodeInputField.val(employee.zipCode);
    //        zipCodeInputField.triggerHandler('input');
    //
    //        expect(element.isolateScope().employeeContactDetailsForm).toBeDefined();
    //        expect(element.isolateScope().vm.employee.phoneNumber).toEqual(employee.phoneNumber);
    //        expect(element.isolateScope().vm.employee.address).toEqual(employee.address);
    //        expect(element.isolateScope().vm.employee.city).toEqual(employee.city);
    //        expect(element.isolateScope().vm.employee.zipCode).toEqual(employee.zipCode);
    //        expect(element.isolateScope().employeeContactDetailsForm.$valid).toEqual(true);
    //    });
    //});

    describe('Controller', () => {
        let employeeAuthorizations, EmployeeModel, LocationModel, itemMock = {locations: []};

        beforeEach(inject((_EmployeeModel_, _LocationModel_) => {
            EmployeeModel = _EmployeeModel_;
            LocationModel = _LocationModel_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

            employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);

            expect(employeeAuthorizations.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have roles property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

            employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);

            expect(employeeAuthorizations.roles).toEqual(Object.values(USER_ROLES));
        });

        it('should have locations property', () => {
            spyOn(LocationModel, 'getCollection').and.returnValue([{status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, default: true}, {status: EMPLOYEE_PROFILE_STATUSES.INACTIVE, default: false}]);

            employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);

            expect(employeeAuthorizations.locations.length).toEqual(1);
            expect(employeeAuthorizations.locations).toEqual([{status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, default: true}]);
            expect(LocationModel.getCollection).toHaveBeenCalled();
        });

        it(`should have employee.role set to ${USER_ROLES.EMPLOYEE} if employee.role is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

            employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);

            expect(employeeAuthorizations.employee.role).toEqual(USER_ROLES.EMPLOYEE);
        });

        it(`should have employee.locations set to default location if employee.locations is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue({});
            spyOn(LocationModel, 'getCollection').and.returnValue([{status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, id: '1', default: false}, {status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, id: '2', default: true}]);

            employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);

            expect(employeeAuthorizations.employee.locations).toEqual(['2']);
        });

        it(`should have employee.supervisorLocations set to [] if employee.supervisorLocations is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(LocationModel, 'getCollection').and.returnValue([{id: '2', default: true}]);

            employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);

            expect(employeeAuthorizations.employee.supervisorLocations).toEqual([]);
        });

        describe('deleteSupervisorLocations', () => {
            it(`should delete supervisor locations when employee.role is not equal ${USER_ROLES.SUPERVISOR}`, () => {
                spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
                employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);
                employeeAuthorizations.employee.role = USER_ROLES.EMPLOYEE;
                employeeAuthorizations.employee.supervisorLocations = ['1'];

                employeeAuthorizations.deleteSupervisorLocations();

                expect(employeeAuthorizations.employee.supervisorLocations.length).toEqual(0);
            });

            it(`should not delete supervisor locations when employee.role is equal ${USER_ROLES.SUPERVISOR}`, () => {
                spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
                employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);
                employeeAuthorizations.employee.role = USER_ROLES.SUPERVISOR;
                employeeAuthorizations.employee.supervisorLocations = ['1'];

                employeeAuthorizations.deleteSupervisorLocations();

                expect(employeeAuthorizations.employee.supervisorLocations.length).toEqual(1);
            });
        });

        describe('selectAll', () => {
            it(`should set employee.supervisorLocations to []`, () => {
                spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
                employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);
                employeeAuthorizations.employee.supervisorLocations = ['1'];

                employeeAuthorizations.selectAll(false, 'supervisorLocations');

                expect(employeeAuthorizations.employee.supervisorLocations.length).toEqual(0);
            });

            it(`should select all locations with id`, () => {
                spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
                employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);
                employeeAuthorizations.employee.supervisorLocations = [];
                employeeAuthorizations.locations = [{id: '1'}, {id: '2'}];

                employeeAuthorizations.selectAll(true, 'supervisorLocations');

                expect(employeeAuthorizations.employee.supervisorLocations).toEqual(['1', '2']);
            });
        });

        describe('toggleSelection', () => {
            it(`should select new one`, () => {
                spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
                employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);
                employeeAuthorizations.employee.supervisorLocations = ['1', '2'];
                employeeAuthorizations.locations = [{id: '1'}, {id: '2'}, {id: '3'}];
                employeeAuthorizations.selectedAllSupervisorLocations = false;

                employeeAuthorizations.toggleSelection('3', employeeAuthorizations.selectedAllSupervisorLocations, 'supervisorLocations');

                expect(employeeAuthorizations.employee.supervisorLocations).toEqual(['1', '2', '3']);
            });

            it(`should unselect current one`, () => {
                spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
                employeeAuthorizations = new EmployeeAuthorizations(EmployeeModel, LocationModel);
                employeeAuthorizations.employee.supervisorLocations = ['1', '2'];
                employeeAuthorizations.locations = [{id: '1'}, {id: '2'}, {id: '3'}];
                employeeAuthorizations.selectedAllSupervisorLocations = false;

                employeeAuthorizations.toggleSelection('1', employeeAuthorizations.selectedAllSupervisorLocations, 'supervisorLocations');

                expect(employeeAuthorizations.employee.supervisorLocations).toEqual(['2']);
                expect(employeeAuthorizations.selectedAllSupervisorLocations).toEqual(false);
            });
        });
    });
});
