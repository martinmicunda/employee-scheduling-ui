/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from '../../../../core/resources/employee/fixtures/employee_1.json!json';
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
        let $compile, $rootScope, scope, render, element,
            itemMock = {id: 'id', avatar: employee.avatar};

        beforeEach(inject((_$compile_, _$rootScope_, EmployeeModel) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();

            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);

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

        it('should have `Account Details` title defined', () => {
            element = render();
            const title = element.find('h4');

            expect(title.text()).toEqual('Account Details');
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        it('should have `mm-modal-warning-unsaved-form` component defined', () => {
            element = render();

            expect(element.find('form').attr('mm-modal-warning-unsaved-form')).toBeDefined();
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

                    expect(uploadButton.attr('ng-src')).toEqual(itemMock.avatar);
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
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
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
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `email` maxlength error message', inject(($timeout) => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('test@test.com' + CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    $timeout.flush(); // flush debounce

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                }));

                it('should show `email` invalid error message', inject(($timeout) => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('invalid-email');
                    inputField.triggerHandler('input');
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    $timeout.flush(); // flush debounce

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="email"]'));

                    expect(errorMessage.text()).toEqual('Invalid email.');
                }));

                xit('should show `email` unique error message', inject(($timeout, EmployeeResource) => {
                    spyOn(EmployeeResource, 'getEmployeeByEmail').and.returnValue(Promise.resolve());
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val(employee.email);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    $timeout.flush(); // flush debounce

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="unique"]'));

                    expect(errorMessage.text()).toEqual('Email has already been taken.');
                }));
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
                    element.isolateScope().accountDetailsForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('textarea[name="note"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 255 characters).');
                });
            });
        });

        xit('should submit the form', inject(($timeout, EmployeeResource) => {
            spyOn(EmployeeResource, 'getEmployeeByEmail').and.returnValue(Promise.reject());
            element = render();

            const firstNameInputField = angular.element(element[0].querySelector('input[name="firstName"][type="text"]'));
            firstNameInputField.val(employee.firstName);
            firstNameInputField.triggerHandler('input');

            const lastNameInputField = angular.element(element[0].querySelector('input[name="lastName"][type="text"]'));
            lastNameInputField.val(employee.lastName);
            lastNameInputField.triggerHandler('input');

            const emailInputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
            emailInputField.val(employee.email);
            emailInputField.triggerHandler('input');
            $timeout.flush(); // flush debounce

            const noteInputField = angular.element(element[0].querySelector('textarea[name="note"]'));
            noteInputField.val(employee.note);
            noteInputField.triggerHandler('input');

            expect(element.isolateScope().accountDetailsForm).toBeDefined();
            expect(element.isolateScope().vm.employee.firstName).toEqual(employee.firstName);
            expect(element.isolateScope().vm.employee.lastName).toEqual(employee.lastName);
            expect(element.isolateScope().vm.employee.email).toEqual(employee.email);
            expect(element.isolateScope().vm.employee.note).toEqual(employee.note);

            expect(element.isolateScope().accountDetailsForm.$valid).toEqual(true);
        }));

        it('should have `jp-ng-bs-animated-button` component defined with attributes `is-submitting`, `result` and `options`', () => {
            element = render();
            const saveButton = angular.element(element[0].querySelector('button.btn-success'));

            expect(saveButton[0]).toBeDefined();
            expect(saveButton.attr('is-submitting')).toEqual('vm.isSubmitting');
            expect(saveButton.attr('result')).toEqual('vm.result');
            expect(saveButton.attr('options')).toEqual('vm.saveButtonOptions');
        });
    });

    describe('Controller', () => {
        let accountDetails, FormService, EmployeeModel, SettingModel, Upload, EmployeeResource,
            itemMock = {avatar: 'avatar', firstName: 'firstName', lastName: 'lastName', email: 'email', note: 'note'};

        beforeEach(inject((_FormService_, _EmployeeModel_, _SettingModel_, _Upload_, _EmployeeResource_) => {
            Upload = _Upload_;
            FormService = _FormService_;
            SettingModel = _SettingModel_;
            EmployeeModel = _EmployeeModel_;
            EmployeeResource = _EmployeeResource_;
        }));

        it('should have employee property', () => {
            spyOn(Object, 'assign').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(accountDetails.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
            //expect(Object.assign).toHaveBeenCalledWith({}, itemMock); FIXME: it call spy on Object.assign for some reason
        });

        it('should have employeeCloned property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(accountDetails.employeeCloned).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(accountDetails.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(accountDetails.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(accountDetails.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should calculate profile completeness when controller is loaded', () => {
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();
        });

        it('should set default avatar image', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(SettingModel, 'getItem').and.returnValue({avatar: 'avatar-default'});
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(accountDetails.employee.avatar).toEqual(itemMock.avatar);

            accountDetails.removeAvatar();

            expect(accountDetails.employee.avatar).toEqual('avatar-default');
            expect(SettingModel.getItem).toHaveBeenCalled();
        });

        itAsync('should add new avatar image', () => {
            spyOn(Upload, 'dataUrl').and.returnValue(Promise.resolve('avatar-new'));
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            expect(accountDetails.employee.avatar).toEqual(itemMock.avatar);

            return accountDetails.addAvatar('file').then(() => {
                expect(accountDetails.employee.avatar).toEqual('avatar-new');
                expect(Upload.dataUrl).toHaveBeenCalledWith('file', true);
            });
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            accountDetails.save(form);

            expect(accountDetails.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true, $setPristine: () => {}}, item = {cas: 'newCas'};
            spyOn(EmployeeResource, 'updateAccountDetails').and.returnValue(Promise.resolve(item));
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            spyOn(FormService, 'onSuccess');
            spyOn(form, '$setPristine');

            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);
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
                expect(EmployeeResource.updateAccountDetails).toHaveBeenCalledWith(accountDetails.employee);
                expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();

                expect(accountDetails.employee.cas).toEqual(item.cas);
                expect(accountDetails.employeeCloned.avatar).toEqual(accountDetails.employee.avatar);
                expect(accountDetails.employeeCloned.firstName).toEqual(accountDetails.employee.firstName);
                expect(accountDetails.employeeCloned.lastName).toEqual(accountDetails.employee.lastName);
                expect(accountDetails.employeeCloned.email).toEqual(accountDetails.employee.email);
                expect(accountDetails.employeeCloned.note).toEqual(accountDetails.employee.note);

                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onSuccess).toHaveBeenCalled();
            });
        });

        itAsync('should not save if there is failure', () => {
            let form = {$valid: true, $setPristine: () => {}};
            spyOn(EmployeeResource, 'updateAccountDetails').and.returnValue(Promise.reject('error'));
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onFailure');

            accountDetails = new AccountDetails(EmployeeModel, SettingModel, Upload, FormService, EmployeeResource);

            return accountDetails.save(form).then(() => {
                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onFailure).toHaveBeenCalledWith(accountDetails, 'error');
            });
        });
    });
});
