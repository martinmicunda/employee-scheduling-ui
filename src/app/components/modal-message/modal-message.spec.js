/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {fakeModal} from '../../../../test/helpers/modal.js';
import MessageModal from './modal-message.js';

describe('ModalMessage', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, ModalModel, MessageModel, EmployeeModel,
            component = '<modal-message></modal-message>', employee = {email: 'email', firstName: 'firstName'},
            currentUser = {firstName: 'firstName', lastName: 'lastName'}, message = {subject: 'subject', body: 'body'};

        beforeEach(inject((_$compile_, _$rootScope_, _ModalModel_, _MessageModel_, _EmployeeModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $rootScope.currentUser = currentUser;
            scope = $rootScope.$new();
            ModalModel = _ModalModel_;
            MessageModel = _MessageModel_;
            EmployeeModel = _EmployeeModel_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            spyOn(EmployeeModel, 'getItem').and.returnValue(employee);

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have `modal-message` component', () => {
            element = render();

            expect(element.controller('modalMessage')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        describe('Show title', () => {
            it('should have `Send Message` modal title defined', () => {
                spyOn(MessageModel, 'getItem').and.returnValue(message);
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Send Message');
            });
        });

        describe('Close modal', () => {
            it('should have `×` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.close')).text()).toEqual('×');
            });

            it('should close the Message modal when `×` button is clicked', () => {
                element = render();
                spyOn(element.isolateScope().vm, 'cancel');

                angular.element(element[0].querySelector('button.close')).triggerHandler('click');

                expect(element.isolateScope().vm.cancel).toHaveBeenCalled();
            });

            it('should have `Close` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.btn-white')).text()).toEqual('Close');
            });

            it('should close the Message modal when `Close` button is clicked', () => {
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

                const subjectInputField = angular.element(element[0].querySelector('input[name="subject"][type="text"]'));
                subjectInputField.val(message.subject);
                subjectInputField.triggerHandler('input');

                const bodyTextareaField = angular.element(element[0].querySelector('textarea[name="body"]'));
                bodyTextareaField.val(message.body);
                bodyTextareaField.triggerHandler('input');

                angular.element(element[0].querySelector('button.btn-success')).triggerHandler('click');

                expect(element.isolateScope().messageForm).toBeDefined();
                expect(element.isolateScope().vm.save).toHaveBeenCalledWith(element.isolateScope().messageForm);
                expect(element.isolateScope().vm.message.subject).toEqual(message.subject);
                expect(element.isolateScope().vm.message.body).toEqual(message.body);
                expect(element.isolateScope().messageForm.$valid).toEqual(true);
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
            const CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg',
                CHARACTERS_3201 = '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';

            describe('subject', () => {
                it('should have `Subject` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="subject"][type="text"]')).parent();

                    expect(parentElement.find('label').text()).toEqual('Subject');
                });

                it('should show `subject` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().messageForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="subject"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `subject` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="subject"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().messageForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="subject"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('message', () => {
                it('should have `Message` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('textarea[name="body"]')).parent();

                    expect(parentElement.find('label').text()).toEqual('Message');
                });

                it('should show `message` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('textarea[name="body"]'));
                    inputField.val(CHARACTERS_3201);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().messageForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('textarea[name="body"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 3200 characters).');
                });
            });
        });

    });

    describe('Controller', () => {
        let messageModal, $rootScope = {}, FormService, MessageModel, ModalModel, EmployeeModel,
            itemMock = {value: 'itemMock'}, employee = {email: 'email', firstName: 'firstName'},
            currentUser = {firstName: 'firstName', lastName: 'lastName'};

        beforeEach(inject((_FormService_, _MessageModel_, _ModalModel_, _EmployeeModel_) => {
            $rootScope.currentUser = currentUser;
            ModalModel = _ModalModel_;
            FormService = _FormService_;
            MessageModel = _MessageModel_;
            EmployeeModel = _EmployeeModel_;

            spyOn(EmployeeModel, 'getItem').and.returnValue(employee);
        }));

        it('should have message property', () => {
            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            expect(messageModal.message).toEqual({to: employee.email, from: `${$rootScope.currentUser.firstName} ${$rootScope.currentUser.lastName}`, firstName: employee.firstName});
        });

        it('should have modal property', () => {
            spyOn(ModalModel, 'getItem').and.returnValue(itemMock);
            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            expect(messageModal.modal).toEqual(itemMock);
            expect(ModalModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            expect(messageModal.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            expect(messageModal.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue({});
            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
            expect(messageModal.saveButtonOptions.buttonDefaultText).toEqual('Send');
            expect(messageModal.saveButtonOptions.buttonSubmittingText).toEqual('Sending');
            expect(messageModal.saveButtonOptions.buttonSuccessText).toEqual('Sent');
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            messageModal.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            messageModal.save(form);

            expect(messageModal.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(FormService, 'save');

            messageModal = new MessageModal(ModalModel, $rootScope, FormService, EmployeeModel, MessageModel);

            messageModal.save(form);

            expect(messageModal.isSubmitting).toEqual(true);
            expect(FormService.save).toHaveBeenCalledWith(MessageModel, messageModal.message, messageModal, form);
        });
    });
});
