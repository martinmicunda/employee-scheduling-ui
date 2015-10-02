/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {EMPLOYEE_PROFILE_STATUSES, USER_ROLES} from '../../core/constants/constants';
import employee from '../../core/resources/employee/fixtures/employee_1.json!json';
import EmployeeAccountDetails from './employee-account-details.js';

describe('EmployeeAccountDetails', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $timeout, $compile, $rootScope, scope, render, element, EmployeeModel, EmployeeResource, PositionResource, LocationModel,
            component = '<employee-account-details></employee-account-details>',
            itemMock = {id: 'id', status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, avatar: employee.avatar};

        beforeEach(inject((_$compile_, _$rootScope_, _EmployeeModel_, _$timeout_, _EmployeeResource_, _PositionResource_, _LocationModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            $timeout = _$timeout_;
            EmployeeModel = _EmployeeModel_;
            EmployeeResource = _EmployeeResource_;
            PositionResource = _PositionResource_;
            LocationModel = _LocationModel_;

            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'getCollection').and.returnValue([]);
            spyOn(PositionResource, 'getList').and.returnValue([]);
            spyOn(EmployeeResource, 'getList').and.returnValue([]);
            spyOn(LocationModel, 'getCollection').and.returnValue([{status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, id: '1', default: false}, {status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, id: '2', default: true}]);

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        afterEach(inject(($httpBackend) => {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        }));

        it('should have `employee-hourly-rate` component', () => {
            element = render();

            expect(element.controller('employeeAccountDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `Account Details` title defined', () => {
            element = render();
            const title = element.find('legend');

            expect(title.text()).toEqual('Account Details');
        });

        describe('Form fields', () => {
            const CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg',
                CHARACTERS_256 = 'fqxzhnhtcllqhdlakuxtmmpvcfwkvogfwpnvbrlycjkhuzqcdngdjotxxqnzpylgtfppepcfuvynjhnastipjfpyfcplvjyizcqrqgqnxcccmbolptxoobvghalhuivipuslkglfcseidtlqvgcynmxkycgxsbnszhvmsdmajiybfzpsyrjoelevryzdadreeilykndmnckfugzrkrwbflrwethqfiomsrlbbijrlqrjsrpcxmhhlomyqddpyljt';

            describe('avatar', () => {
                it('should have `Photo` label defined', () => {
                    element = render();

                    const parentElement = angular.element(element[0].querySelector('.img-circle')).parent().parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Photo');
                });

                it('should have `Change photo` label defined', () => {
                    element = render();

                    const label = angular.element(element[0].querySelector('.dropdown-toggle'));

                    expect(label.text().includes('Change photo')).toEqual(true);
                });

                it('should have avatar url defined', () => {
                    element = render();

                    const uploadButton = angular.element(element[0].querySelector('.img-circle'));

                    expect(uploadButton.attr('ng-src')).toEqual(employee.avatar);
                });

                it('should have `upload photo button` component defined with attributes `ngf-select`, `ngf-pattern`, `accept` and `ngf-max-size`', () => {
                    element = render();

                    const uploadButton = angular.element(element[0].querySelector('ul.dropdown-menu li:first-child a'));

                    expect(uploadButton.attr('ngf-pattern')).toEqual('image/*');
                    expect(uploadButton.attr('accept')).toEqual('image/*');
                    expect(uploadButton.attr('ngf-max-size')).toEqual('2MB');
                    expect(uploadButton.attr('ngf-select')).toEqual('vm.addAvatar($file)');
                });

                it('should have `Upload photo` label defined', () => {
                    element = render();

                    const label = angular.element(element[0].querySelector('ul.dropdown-menu li:first-child a'));

                    expect(label.text()).toEqual('Upload photo');
                });

                it('should call `vm.removeAvatar` when upload photo button is clicked', function () {
                    element = render();
                    spyOn(element.isolateScope().vm, 'removeAvatar');

                    angular.element(element[0].querySelector('ul.dropdown-menu li:last-child a')).triggerHandler('click');

                    expect(element.isolateScope().vm.removeAvatar).toHaveBeenCalled();
                });

                it('should have `Remove` label defined', function () {
                    element = render();

                    const removeButton = angular.element(element[0].querySelector('ul.dropdown-menu li:last-child a'));

                    expect(removeButton.text()).toEqual('Remove');
                });
            });

            describe('firstName', () => {
                it('should have `First Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="firstName"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('First Name');
                });

                it('should show `firstName` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="firstName"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `firstName` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="firstName"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="firstName"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('lastName', () => {
                it('should have `Last Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="lastName"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Last Name');
                });

                it('should show `lastName` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="lastName"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `lastName` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="lastName"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="lastName"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('email', () => {
                it('should have `Email` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="email"][type="email"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Email');
                });

                it('should have debounce property set to 500', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="email"][type="email"]'));

                    expect(parentElement.attr('ng-model-options')).toEqual('{ debounce: 500 }');
                });

                it('should show `email` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `email` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('test@test.com' + CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    $timeout.flush(); // flush debounce

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });

                it('should show `email` invalid error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('invalid-email');
                    inputField.triggerHandler('input');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    $timeout.flush(); // flush debounce

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="email"]'));

                    expect(errorMessage.text()).toEqual('Invalid email.');
                });

                xit('should show `email` unique error message', () => {
                    spyOn(EmployeeResource, 'getEmployeeByEmail').and.returnValue(Promise.resolve());
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val(employee.email);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    $timeout.flush(); // flush debounce

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="unique"]'));

                    expect(errorMessage.text()).toEqual('Email has already been taken.');
                });
            });

            describe('position', () => {
                it('should have `Position` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('select[name="position"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Position');
                });

                it('should show `position` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('select[name="position"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show dropdown positions order by name', () => {
                    const positions = [{id: '1', name: 'B'}, {id: '2', name: 'A'}, {id: '3', name: 'C'}],
                        positionsOrdered = [positions[1], positions[0], positions[2]];
                    element = render();
                    element.isolateScope().vm.positions = positions;
                    scope.$digest();

                    const options = Array.from(angular.element(element[0].querySelectorAll('select[name="position"] > option')));

                    positionsOrdered.forEach((position, index) => {
                        // verify option label
                        expect(angular.element(options[index + 1]).text()).toEqual(position.name);

                        // verify option key
                        expect(angular.element(options[index + 1]).attr('value')).toEqual('string:' + position.id);
                    });
                });
            });

            describe('status', () => {
                it('should have `Status` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('select[name="status"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Status');
                });

                it('should show dropdown statuses', () => {
                    const statuses = ['a', 'b', 'c'];
                    element = render();
                    element.isolateScope().vm.statuses = statuses;
                    scope.$digest();

                    const options = Array.from(angular.element(element[0].querySelectorAll('select[name="status"] > option')));

                    statuses.forEach((status, index) => {
                        // verify option label
                        expect(angular.element(options[index + 1]).text()).toEqual(status);

                        // verify option key
                        expect(angular.element(options[index + 1]).attr('value')).toEqual('string:' + status);
                    });
                });

                it('should show `status` required error message', () => {
                    element = render();
                    element.isolateScope().vm.employee.status = '';
                    scope.$digest();
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('select[name="status"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it(`should hide status field when employee.status is not equal ${EMPLOYEE_PROFILE_STATUSES.PENDING}`, () => {
                    element = render();
                    element.isolateScope().vm.employee.status = EMPLOYEE_PROFILE_STATUSES.PENDING;
                    scope.$digest();

                    expect(angular.element(element[0].querySelector('select[name="status"]'))).toEqual({});
                });

                it(`should hide status field when employee.id is not defined`, () => {
                    element = render();
                    element.isolateScope().vm.employee.id = undefined;
                    element.isolateScope().vm.employee.status = EMPLOYEE_PROFILE_STATUSES.ACTIVE;
                    scope.$digest();

                    expect(angular.element(element[0].querySelector('select[name="status"]'))).toEqual({});
                });
            });

            describe('personalNo', () => {
                it('should have `Personal No.` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="personalNo"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Personal No.');
                });

                it('should show `personalNo` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="personalNo"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="personalNo"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('identityNo', () => {
                it('should have `ID Card No.` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="identityNo"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('ID Card No.');
                });

                it('should show `identityNo` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="identityNo"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="identityNo"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('Note', () => {
                it('should have `Note` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('textarea[name="note"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Note');
                });

                it('should show `note` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('textarea[name="note"]'));
                    inputField.val(CHARACTERS_256);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().employeeAccountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('textarea[name="note"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 255 characters).');
                });
            });
        });

        xit('should submit the form', function () {
            spyOn(EmployeeResource, 'getEmployeeByEmail').and.returnValue(Promise.reject());
            const positions =  [{id: '5', name: 'B'}];
            element = render();
            element.isolateScope().vm.positions = positions;
            scope.$digest();

            const firstNameInputField = angular.element(element[0].querySelector('input[name="firstName"][type="text"]'));
            firstNameInputField.val(employee.firstName);
            firstNameInputField.triggerHandler('input');

            const lastNameInputField = angular.element(element[0].querySelector('input[name="lastName"][type="text"]'));
            lastNameInputField.val(employee.lastName);
            lastNameInputField.triggerHandler('input');

            element.isolateScope().employeeAccountDetailsForm.position.$setViewValue(positions[0].id);
            element.isolateScope().employeeAccountDetailsForm.status.$setViewValue(EMPLOYEE_PROFILE_STATUSES.INACTIVE);

            const personalNoInputField = angular.element(element[0].querySelector('input[name="personalNo"][type="text"]'));
            personalNoInputField.val(employee.personalNo);
            personalNoInputField.triggerHandler('input');

            const identityNoInputField = angular.element(element[0].querySelector('input[name="identityNo"][type="text"]'));
            identityNoInputField.val(employee.identityNo);
            identityNoInputField.triggerHandler('input');

            const noteInputField = angular.element(element[0].querySelector('textarea[name="note"]'));
            noteInputField.val(employee.note);
            noteInputField.triggerHandler('input');

            //const emailInputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
            //emailInputField.val(employee.email);
            //emailInputField.triggerHandler('input');
            //$timeout.flush(); // flush debounce

            expect(element.isolateScope().employeeAccountDetailsForm).toBeDefined();
            expect(element.isolateScope().vm.employee.firstName).toEqual(employee.firstName);
            expect(element.isolateScope().vm.employee.lastName).toEqual(employee.lastName);
            //expect(element.isolateScope().vm.employee.email).toEqual(employee.email);
            expect(element.isolateScope().vm.employee.position).toEqual(employee.position);
            expect(element.isolateScope().vm.employee.status).toEqual(EMPLOYEE_PROFILE_STATUSES.INACTIVE);
            expect(element.isolateScope().vm.employee.personalNo).toEqual(employee.personalNo);
            expect(element.isolateScope().vm.employee.identityNo).toEqual(employee.identityNo);
            expect(element.isolateScope().vm.employee.note).toEqual(employee.note);

            expect(element.isolateScope().employeeAccountDetailsForm.$valid).toEqual(true);
        });
    });

    describe('Controller', () => {
        let employeeAccountDetails, EmployeeModel, PositionModel, SettingModel, Upload, LocationModel, itemMock = {locations: [], language: 'en', avatar: 'av'};

        beforeEach(inject((_EmployeeModel_, _PositionModel_, _SettingModel_, _Upload_, _LocationModel_) => {
            EmployeeModel = _EmployeeModel_;
            SettingModel = _SettingModel_;
            PositionModel = _PositionModel_;
            LocationModel = _LocationModel_;
            Upload = _Upload_;
        }));

        it('should have statusPending property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.statusPending).toEqual(EMPLOYEE_PROFILE_STATUSES.PENDING);
        });

        it('should have statuses property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.statuses).toEqual([EMPLOYEE_PROFILE_STATUSES.ACTIVE, EMPLOYEE_PROFILE_STATUSES.INACTIVE]);
        });

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(SettingModel, 'getItem');

            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
            expect(SettingModel.getItem).not.toHaveBeenCalled();
        });

        it('should have positions property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(PositionModel, 'getCollection').and.returnValue(employee);

            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.positions).toEqual(employee);
            expect(PositionModel.getCollection).toHaveBeenCalled();
        });

        it(`should have employee.language set to setting language if employee.language is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue({locations: []});
            spyOn(SettingModel, 'getItem').and.returnValue({language: 'test'});
            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee.language).toEqual('test');
            expect(SettingModel.getItem).toHaveBeenCalled();
        });

        it(`should have employee.avatar set to setting avatar if employee.avatar is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue({locations: [], language: 'en'});
            spyOn(SettingModel, 'getItem').and.returnValue({avatar: 'test'});
            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee.avatar).toEqual('test');
            expect(SettingModel.getItem).toHaveBeenCalled();
        });

        it(`should have employee.status set to ${EMPLOYEE_PROFILE_STATUSES.PENDING} if employee.status is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee.status).toEqual(EMPLOYEE_PROFILE_STATUSES.PENDING);
        });

        it(`should have employee.role set to ${USER_ROLES.EMPLOYEE} if employee.role is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee.role).toEqual(USER_ROLES.EMPLOYEE);
        });

        it(`should have employee.locations set to default location if employee.locations is undefined`, () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue({});
            spyOn(LocationModel, 'getCollection').and.returnValue([{status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, id: '1', default: false}, {status: EMPLOYEE_PROFILE_STATUSES.ACTIVE, id: '2', default: true}]);

            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee.locations).toEqual(['2']);
        });

        it('should set default avatar image', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(employee);
            spyOn(SettingModel, 'getItem').and.returnValue({avatar: 'avatar-default'});
            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee.avatar).toEqual(employee.avatar);

            employeeAccountDetails.removeAvatar();

            expect(employeeAccountDetails.employee.avatar).toEqual('avatar-default');
            expect(SettingModel.getItem).toHaveBeenCalled();
        });

        itAsync('should add new avatar image', () => {
            spyOn(Upload, 'dataUrl').and.returnValue(Promise.resolve('avatar-new'));
            spyOn(EmployeeModel, 'getItem').and.returnValue(employee);
            employeeAccountDetails = new EmployeeAccountDetails(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel);

            expect(employeeAccountDetails.employee.avatar).toEqual(employee.avatar);

            return employeeAccountDetails.addAvatar('file').then(() => {
                expect(employeeAccountDetails.employee.avatar).toEqual('avatar-new');
                expect(Upload.dataUrl).toHaveBeenCalledWith('file', true);
            });
        });
    });
});
