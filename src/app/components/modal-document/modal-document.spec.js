/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {fakeModal} from '../../../../test/helpers/modal.js';
import document from '../../core/resources/document/fixtures/document_1.json!json';
import DocumentModal from './modal-document.js';

describe('DocumentModal', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, ModalModel, DocumentModel,
            component = '<modal-document></modal-document>';

        beforeEach(inject((_$compile_, _$rootScope_, _ModalModel_, _DocumentModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            ModalModel = _ModalModel_;
            DocumentModel = _DocumentModel_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have `modal-document` component', () => {
            element = render();

            expect(element.controller('modalDocument')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        describe('Show title', () => {
            it('should have `Edit Folder` modal title defined when location ID exist', () => {
                spyOn(DocumentModel, 'getItem').and.returnValue(document);
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Edit Folder');
            });

            it('should have `Add Folder` modal title defined when location ID does not exist', () => {
                spyOn(DocumentModel, 'getItem').and.returnValue({});
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Add Folder');
            });
        });

        describe('Close modal', () => {
            it('should have `×` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.close')).text()).toEqual('×');
            });

            it('should close the Document modal when `×` button is clicked', () => {
                element = render();
                spyOn(element.isolateScope().vm, 'cancel');

                angular.element(element[0].querySelector('button.close')).triggerHandler('click');

                expect(element.isolateScope().vm.cancel).toHaveBeenCalled();
            });

            it('should have `Close` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.btn-white')).text()).toEqual('Close');
            });

            it('should close the Document modal when `Close` button is clicked', () => {
                element = render();
                spyOn(element.isolateScope().vm, 'cancel');

                angular.element(element[0].querySelector('button.btn-white')).triggerHandler('click');

                expect(element.isolateScope().vm.cancel).toHaveBeenCalled();
            });
        });

        describe('Submit form', () => {
            it('should call `vm.save` when submit is clicked', function () {
                element = render();
                spyOn(element.isolateScope().vm, 'save');

                const nameInputField = angular.element(element[0].querySelector('input[name="name"][type="text"]'));
                nameInputField.val(document.name);
                nameInputField.triggerHandler('input');

                element.isolateScope().documentForm.isLocked.$setViewValue(true);

                angular.element(element[0].querySelector('button.btn-success')).triggerHandler('click');

                expect(element.isolateScope().documentForm).toBeDefined();
                expect(element.isolateScope().vm.save).toHaveBeenCalledWith(element.isolateScope().documentForm);
                expect(element.isolateScope().vm.document.name).toEqual(document.name);
                expect(element.isolateScope().vm.document.isLocked).toEqual(true);
                expect(element.isolateScope().documentForm.$valid).toEqual(true);
            });

            it('should have `jp-ng-bs-animated-button` component defined with attributes `is-submitting`, `result` and `options`', () => {
                element = render();
                const saveButton = angular.element(element[0].querySelector('button.btn-success'));

                expect(saveButton[0]).toBeDefined();
                expect(saveButton.attr('is-submitting')).toEqual('vm.isSubmitting');
                expect(saveButton.attr('result')).toEqual('vm.result');
                expect(saveButton.attr('options')).toEqual('vm.saveButtonOptions');
            });
        });

        describe('Form fields', () => {
            const CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg';

            describe('name', () => {
                it('should have `Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="name"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Name');
                });

                it('should show `name` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().documentForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `name` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="name"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().documentForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('isLocked', () => {
                it('should have `Lock the folder?` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="isLocked"][type="checkbox"]')).parent().parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Lock the folder?');
                });

                it('should show select dropdown options when isLocked is clicked', () => {
                    spyOn(DocumentModel, 'getItem').and.returnValue({id: 'id'});
                    element = render();
                    element.isolateScope().vm.document.isLocked = true;
                    scope.$digest();

                    const parentElement = angular.element(element[0].querySelector('select[name="selectedEmployeeWithoutAccess"]')).parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(false);
                });

                it('should not show select dropdown options when isLocked is not clicked', () => {
                    spyOn(DocumentModel, 'getItem').and.returnValue({id: 'id'});
                    element = render();
                    element.isolateScope().vm.document.isLocked = false;
                    scope.$digest();

                    const parentElement = angular.element(element[0].querySelector('select[name="selectedEmployeeWithoutAccess"]')).parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(true);
                });
            });

            describe('selectedEmployeeWithoutAccess', () => {
                it('should have `who has not access` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('select[name="selectedEmployeeWithoutAccess"]')).parent();

                    expect(parentElement.find('label').text()).toEqual('who has not access');
                });

                it('should have `who has access` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('select[name="selectedEmployeeWithAccess"]')).parent();

                    expect(parentElement.find('label').text()).toEqual('who has access');
                });

                it('should show dropdown options order by firstName', () => {
                    const employeesWithoutAccess = [{id: '1', firstName: 'B', lastName: 'test'}, {id: '2', firstName: 'A', lastName: 'test'}, {id: '3', firstName: 'C', lastName: 'test'}],
                        employeesWithoutAccessOrdered = [employeesWithoutAccess[1], employeesWithoutAccess[0], employeesWithoutAccess[2]];
                    element = render();
                    element.isolateScope().vm.document.isLocked = true;
                    element.isolateScope().vm.employeesWithoutAccess = employeesWithoutAccess;
                    scope.$digest();

                    const options = Array.from(angular.element(element[0].querySelectorAll('select[name="selectedEmployeeWithoutAccess"] > option')));

                    employeesWithoutAccessOrdered.forEach((employee, index) => {
                        // verify option label
                        expect(angular.element(options[index]).text()).toEqual(employee.firstName + ' ' + employee.lastName);

                        // verify option key
                        expect(angular.element(options[index]).attr('value')).toEqual('string:' + employee.id);
                    });
                });
            });

            describe('selectedEmployeeWithAccess', () => {
                it('should have `who has access` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('select[name="selectedEmployeeWithAccess"]')).parent();

                    expect(parentElement.find('label').text()).toEqual('who has access');
                });

                it('should show dropdown options order by firstName', () => {
                    const employeesWithAccess = [{id: '1', firstName: 'B', lastName: 'test'}, {id: '2', firstName: 'A', lastName: 'test'}, {id: '3', firstName: 'C', lastName: 'test'}],
                        employeesWithAccessOrdered = [employeesWithAccess[1], employeesWithAccess[0], employeesWithAccess[2]];
                    element = render();
                    element.isolateScope().vm.document.isLocked = true;
                    element.isolateScope().vm.employeesWithAccess = employeesWithAccess;
                    scope.$digest();

                    const options = Array.from(angular.element(element[0].querySelectorAll('select[name="selectedEmployeeWithAccess"] > option')));

                    employeesWithAccessOrdered.forEach((employee, index) => {
                        // verify option label
                        expect(angular.element(options[index]).text()).toEqual(employee.firstName + ' ' + employee.lastName);

                        // verify option key
                        expect(angular.element(options[index]).attr('value')).toEqual('string:' + employee.id);
                    });
                });
            });
        });

        it('should call `vm.addAccess` when arrow-right button is clicked', function () {
            element = render();
            spyOn(element.isolateScope().vm, 'addAccess');

            angular.element(element[0].querySelector('i.fa-long-arrow-right')).parent().triggerHandler('click');

            expect(element.isolateScope().vm.addAccess).toHaveBeenCalled();
        });

        it('should call `vm.removeAccess` when arrow-left button is clicked', function () {
            element = render();
            spyOn(element.isolateScope().vm, 'removeAccess');

            angular.element(element[0].querySelector('i.fa-long-arrow-left')).parent().triggerHandler('click');

            expect(element.isolateScope().vm.removeAccess).toHaveBeenCalled();
        });
    });

    describe('Controller', () => {
        let documentModal, FormService, DocumentModel, EmployeeModel, ModalModel, DocumentService, itemMock = {value: 'itemMock'};

        beforeEach(inject((_FormService_, _DocumentModel_, _ModalModel_, _EmployeeModel_, _DocumentService_) => {
            ModalModel = _ModalModel_;
            FormService = _FormService_;
            DocumentModel = _DocumentModel_;
            EmployeeModel = _EmployeeModel_;
            DocumentService = _DocumentService_;
        }));

        it('should have modal property', () => {
            spyOn(ModalModel, 'getItem').and.returnValue(itemMock);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.modal).toEqual(itemMock);
            expect(ModalModel.getItem).toHaveBeenCalled();
        });

        it('should have document property', () => {
            spyOn(DocumentModel, 'getItem').and.returnValue(document);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.document).toEqual(document);
            expect(DocumentModel.getItem).toHaveBeenCalled();
        });

        it('should have employees property', () => {
            spyOn(EmployeeModel, 'getCollection').and.returnValue(itemMock);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.employees).toEqual(itemMock);
            expect(EmployeeModel.getCollection).toHaveBeenCalled();
        });

        it(`should have selectedEmployeeWithAccess set to empty array`, () => {
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.selectedEmployeeWithAccess.length).toEqual(0);
        });

        it(`should have selectedEmployeeWithoutAccess set to empty array`, () => {
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.selectedEmployeeWithoutAccess.length).toEqual(0);
        });

        it('should have isSubmitting property', () => {
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it(`should have employeesWithAccess set to empty array for document id that is undefined`, () => {
            spyOn(DocumentModel, 'getItem').and.returnValue({});
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.employeesWithAccess.length).toEqual(0);
        });

        it(`should have employeesWithoutAccess set to employees for document id that is undefined`, () => {
            spyOn(DocumentModel, 'getItem').and.returnValue({});
            spyOn(EmployeeModel, 'getCollection').and.returnValue(itemMock);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.employeesWithoutAccess).toEqual(itemMock);
        });

        it(`should have employeesWithAccess set to filtered employees with access for document id that is defined`, () => {
            const document = {id: 'id', employees: ['1', '2']}, employees = [{id: '1', name: 'name1'}, {id: '2', name: 'name2'}, {id: '3', name: 'name3'}];
            spyOn(DocumentModel, 'getItem').and.returnValue(document);
            spyOn(EmployeeModel, 'getCollection').and.returnValue(employees);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.employeesWithAccess.length).toEqual(2);
            expect(documentModal.employeesWithAccess).toEqual([employees[0], employees[1]]);
        });

        it(`should have employeesWithoutAccess set to filtered employees without access id that is defined`, () => {
            const document = {id: 'id', employees: ['1', '2']}, employees = [{id: '1', name: 'name1'}, {id: '2', name: 'name2'}, {id: '3', name: 'name3'}];
            spyOn(DocumentModel, 'getItem').and.returnValue(document);
            spyOn(EmployeeModel, 'getCollection').and.returnValue(employees);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            expect(documentModal.employeesWithoutAccess.length).toEqual(1);
            expect(documentModal.employeesWithoutAccess).toEqual([employees[2]]);
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

            documentModal.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        describe('save', () => {
            it('should not save if form is invalid', () => {
                let form = {$valid: false};
                spyOn(FormService, 'save');
                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

                documentModal.save(form);

                expect(documentModal.isSubmitting).toEqual(null);
                expect(FormService.save).not.toHaveBeenCalled();
            });

            it('should save if form is valid', () => {
                let form = {$valid: true};
                spyOn(FormService, 'save');

                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

                documentModal.save(form);

                expect(documentModal.isSubmitting).toEqual(true);
                expect(FormService.save).toHaveBeenCalledWith(DocumentModel, documentModal.document, documentModal, form);
            });

            it('should keep document.employees empty if document is not locked', () => {
                let form = {$valid: true}, document = {id: 'id', employees: ['1', '2'], isLocked: false};
                spyOn(DocumentModel, 'getItem').and.returnValue(document);
                spyOn(FormService, 'save');

                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);

                expect(documentModal.document.employees.length).not.toEqual(0);

                documentModal.save(form);

                expect(documentModal.document.employees.length).toEqual(0);
            });

            it('should add employeesWithAccess to document.employees if document is locked', () => {
                let form = {$valid: true}, document = {id: 'id', employees: [], isLocked: true}, employees = [{id: '1', name: 'name1'}, {id: '2', name: 'name2'}, {id: '3', name: 'name3'}];
                spyOn(DocumentModel, 'getItem').and.returnValue(document);
                spyOn(FormService, 'save');

                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);
                documentModal.employeesWithAccess = employees;

                expect(documentModal.document.employees.length).toEqual(0);

                documentModal.save(form);

                expect(documentModal.document.employees.length).toEqual(3);
            });
        });

        describe('addAccess', () => {
            it('should add employees with access', () => {
                const employeesWithAccessClone = 'employeesWithAccessClone', employeesWithAccess = 'employeesWithAccess', selectedEmployeeWithoutAccess = 'selectedEmployeeWithoutAccess', employeesWithoutAccess = 'employeesWithoutAccess';
                spyOn(DocumentService, 'grantAccess').and.returnValue(employeesWithAccessClone);

                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);
                documentModal.selectedEmployeeWithoutAccess = selectedEmployeeWithoutAccess;
                documentModal.employeesWithoutAccess = employeesWithoutAccess;
                documentModal.employeesWithAccess = employeesWithAccess;

                documentModal.addAccess();

                expect(documentModal.employeesWithAccess).toEqual(employeesWithAccessClone);
                expect(DocumentService.grantAccess).toHaveBeenCalledWith(selectedEmployeeWithoutAccess, employeesWithoutAccess, employeesWithAccess);
            });

            it('should not add employees with access', () => {
                const employeesWithAccessClone = 'employeesWithAccessClone', employeesWithAccess = 'employeesWithAccess';
                spyOn(DocumentService, 'grantAccess').and.returnValue(null);

                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);
                documentModal.employeesWithAccess = employeesWithAccess;

                documentModal.addAccess();

                expect(documentModal.employeesWithAccess).not.toEqual(employeesWithAccessClone);
            });
        });

        describe('removeAccess', () => {
            it('should remove employees with access', () => {
                const employeesWithoutAccessClone = 'employeesWithoutAccessClone', employeesWithAccess = 'employeesWithAccess', selectedEmployeeWithAccess = 'selectedEmployeeWithAccess', employeesWithoutAccess = 'employeesWithoutAccess';
                spyOn(DocumentService, 'grantAccess').and.returnValue(employeesWithoutAccessClone);

                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);
                documentModal.selectedEmployeeWithAccess = selectedEmployeeWithAccess;
                documentModal.employeesWithoutAccess = employeesWithoutAccess;
                documentModal.employeesWithAccess = employeesWithAccess;

                documentModal.removeAccess();

                expect(documentModal.employeesWithoutAccess).toEqual(employeesWithoutAccessClone);
                expect(DocumentService.grantAccess).toHaveBeenCalledWith(selectedEmployeeWithAccess, employeesWithAccess, employeesWithoutAccess);
            });

            it('should not remove employees with access', () => {
                const employeesWithoutAccessClone = 'employeesWithoutAccessClone', employeesWithoutAccess = 'employeesWithoutAccess';
                spyOn(DocumentService, 'grantAccess').and.returnValue(null);

                documentModal = new DocumentModal(ModalModel, DocumentModel, EmployeeModel, DocumentService, FormService);
                documentModal.employeesWithoutAccess = employeesWithoutAccess;

                documentModal.removeAccess();

                expect(documentModal.employeesWithoutAccess).not.toEqual(employeesWithoutAccessClone);
            });
        });
    });
});
