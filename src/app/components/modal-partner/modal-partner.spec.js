/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {EMPLOYEE_PROFILE_STATUSES} from '../../core/constants/constants';
import {fakeModal} from '../../../../test/helpers/modal.js';
import partner from '../../core/resources/partner/fixtures/partner_1.json!json';
import PartnerModal from './modal-partner.js';

describe('ModalPartner', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, ModalModel, PartnerModel,
            component = '<modal-partner></modal-partner>';

        beforeEach(inject((_$compile_, _$rootScope_, _ModalModel_, _PartnerModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            ModalModel = _ModalModel_;
            PartnerModel = _PartnerModel_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have `modal-partner` component', () => {
            element = render();

            expect(element.controller('modalPartner')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        describe('Show title', () => {
            it('should have `Edit Partner` modal title defined when partner ID exist', () => {
                spyOn(PartnerModel, 'getItem').and.returnValue(partner);
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Edit Partner');
            });

            it('should have `Add Partner` modal title defined when partner ID does not exist', () => {
                spyOn(PartnerModel, 'getItem').and.returnValue({});
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Add Partner');
            });
        });

        describe('Close modal', () => {
            it('should have `×` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.close')).text()).toEqual('×');
            });

            it('should close the Partner modal when `×` button is clicked', () => {
                element = render();
                spyOn(element.isolateScope().vm, 'cancel');

                angular.element(element[0].querySelector('button.close')).triggerHandler('click');

                expect(element.isolateScope().vm.cancel).toHaveBeenCalled();
            });

            it('should have `Close` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.btn-white')).text()).toEqual('Close');
            });

            it('should close the Partner modal when `Close` button is clicked', () => {
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
                nameInputField.val(partner.name);
                nameInputField.triggerHandler('input');

                const contactPersonInputField = angular.element(element[0].querySelector('input[name="contactPerson"][type="text"]'));
                contactPersonInputField.val(partner.contactPerson);
                contactPersonInputField.triggerHandler('input');

                const emailInputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                emailInputField.val(partner.email);
                emailInputField.triggerHandler('input');

                const phoneNumberInputField = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]'));
                phoneNumberInputField.val(partner.phoneNumber);
                phoneNumberInputField.triggerHandler('input');

                const colorInputField = angular.element(element[0].querySelector('input[name="color"][type="text"]'));
                colorInputField.val(partner.color);
                colorInputField.triggerHandler('input');

                const statusSelectField = angular.element(element[0].querySelector('select[name="status"]'));
                expect(statusSelectField[0]).toBeDefined();
                statusSelectField.val(partner.status);
                statusSelectField.triggerHandler('select');

                const noteTextareaField = angular.element(element[0].querySelector('textarea[name="note"]'));
                noteTextareaField.val(partner.note);
                noteTextareaField.triggerHandler('input');

                angular.element(element[0].querySelector('button.btn-success')).triggerHandler('click');

                expect(element.isolateScope().partnerForm).toBeDefined();
                expect(element.isolateScope().vm.save).toHaveBeenCalledWith(element.isolateScope().partnerForm);
                expect(element.isolateScope().vm.partner.name).toEqual(partner.name);
                expect(element.isolateScope().vm.partner.contactPerson).toEqual(partner.contactPerson);
                expect(element.isolateScope().vm.partner.email).toEqual(partner.email);
                expect(element.isolateScope().vm.partner.phoneNumber).toEqual(partner.phoneNumber);
                expect(element.isolateScope().vm.partner.color).toEqual(partner.color);
                expect(element.isolateScope().vm.partner.status).toEqual(partner.status);
                expect(element.isolateScope().vm.partner.note).toEqual(partner.note);
                expect(element.isolateScope().partnerForm.$valid).toEqual(true);
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
            const CHARACTERS_21 = 'flygvfxmfwqhspfwjyxtz',
                CHARACTERS_61 = 'flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg',
                CHARACTERS_256 = 'fqxzhnhtcllqhdlakuxtmmpvcfwkvogfwpnvbrlycjkhuzqcdngdjotxxqnzpylgtfppepcfuvynjhnastipjfpyfcplvjyizcqrqgqnxcccmbolptxoobvghalhuivipuslkglfcseidtlqvgcynmxkycgxsbnszhvmsdmajiybfzpsyrjoelevryzdadreeilykndmnckfugzrkrwbflrwethqfiomsrlbbijrlqrjsrpcxmhhlomyqddpyljt';

            describe('name', () => {
                it('should have `Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="name"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Name');
                });

                it('should show `name` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `name` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="name"][type="text"]'));
                    inputField.val(CHARACTERS_21);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 20 characters).');
                });
            });

            describe('contactPerson', () => {
                it('should have `Contact Person` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="contactPerson"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Contact Person');
                });

                it('should show `contactPerson` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="contactPerson"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="contactPerson"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('email', () => {
                it('should have `Email` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="email"][type="email"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Email');
                });

                it('should show `email` email error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('invalid-email');
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="email"]'));

                    expect(errorMessage.text()).toEqual('Invalid email.');
                });

                it('should show `email` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="email"][type="email"]'));
                    inputField.val('test@test.com' + CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="email"][type="email"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });

            describe('phoneNumber', () => {
                it('should have `Phone Number` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Phone Number');
                });

                it('should show `phoneNumber` maxlength error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"]'));
                    inputField.val(CHARACTERS_21);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="phoneNumber"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 20 characters).');
                });
            });

            describe('color', () => {
                it('should have `Color` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="color"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Color');
                });

                it('should show `color` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="color"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(errorMessage.text()).toEqual('This field is required.');
                });

                it('should show `color` hex error message', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="color"][type="text"]'));
                    inputField.val(CHARACTERS_61);
                    inputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('input[name="color"][type="text"] ~ div > div[ng-message="hexcode"]'));

                    expect(errorMessage.text()).toEqual('Invalid HEX color code.');
                });

                it('should have `colorpicker` attribute defined', () => {
                    element = render();
                    const inputField = angular.element(element[0].querySelector('input[name="color"][colorpicker]'));

                    expect(inputField[0]).toBeDefined();
                });
            });

            describe('status', () => {
                it('should have `Status` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('select[name="status"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Status');
                });

                it('should show statuses dropdown options', () => {
                    element = render();

                    const options = Array.from(angular.element(element[0].querySelectorAll('select[name="status"] > option')));

                    element.isolateScope().vm.statusTypes.forEach((status, index) => {
                        // verify option label
                        expect(angular.element(options[index]).text()).toEqual(status);

                        // verify option key
                        expect(angular.element(options[index]).attr('value')).toEqual('string:' + status);
                    });
                });

                it('should show status field when partner ID exist', () => {
                    spyOn(PartnerModel, 'getItem').and.returnValue(partner);
                    element = render();

                    const parentElement = angular.element(element[0].querySelector('select[name="status"]')).parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(false);
                });

                it('should hide status field when partner ID does not exist', () => {
                    spyOn(PartnerModel, 'getItem').and.returnValue({});
                    element = render();

                    const parentElement = angular.element(element[0].querySelector('select[name="status"]')).parent().parent();

                    expect(parentElement.hasClass('ng-hide')).toEqual(true);
                });
            });

            describe('note', () => {
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
                    element.isolateScope().partnerForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const errorMessage = angular.element(element[0].querySelector('textarea[name="note"] ~ div > div[ng-message="maxlength"]'));

                    expect(errorMessage.text()).toEqual('This field text is too long (max 255 characters).');
                });
            });
        });

    });

    describe('Controller', () => {
        let partnerModal, FormService, PartnerModel, ModalModel, itemMock = {value: 'itemMock'};

        beforeEach(inject((_FormService_, _PartnerModel_, _ModalModel_) => {
            ModalModel = _ModalModel_;
            FormService = _FormService_;
            PartnerModel = _PartnerModel_;
        }));

        it('should have modal property', () => {
            spyOn(ModalModel, 'getItem').and.returnValue(itemMock);
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            expect(partnerModal.modal).toEqual(itemMock);
            expect(ModalModel.getItem).toHaveBeenCalled();
        });

        it('should have partner property', () => {
            let clonedObject = Object.assign({}, itemMock);
            clonedObject.status = EMPLOYEE_PROFILE_STATUSES.INACTIVE;
            spyOn(PartnerModel, 'getItem').and.returnValue(clonedObject);
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            expect(partnerModal.partner).toEqual(clonedObject);
            expect(PartnerModel.getItem).toHaveBeenCalled();
        });

        it(`should have partner.status set to ${EMPLOYEE_PROFILE_STATUSES.ACTIVE} if partner.status is null`, () => {
            let clonedObject = Object.assign({}, itemMock);
            spyOn(PartnerModel, 'getItem').and.returnValue(clonedObject);
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            expect(partnerModal.partner.status).toEqual(EMPLOYEE_PROFILE_STATUSES.ACTIVE);
        });

        it('should have statusTypes property', () => {
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            expect(partnerModal.statusTypes).toEqual([EMPLOYEE_PROFILE_STATUSES.ACTIVE, EMPLOYEE_PROFILE_STATUSES.INACTIVE]);
        });

        it('should have isSubmitting property', () => {
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            expect(partnerModal.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            expect(partnerModal.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            expect(partnerModal.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            partnerModal.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            partnerModal.save(form);

            expect(partnerModal.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(FormService, 'save');

            partnerModal = new PartnerModal(ModalModel, PartnerModel, FormService);

            partnerModal.save(form);

            expect(partnerModal.isSubmitting).toEqual(true);
            expect(FormService.save).toHaveBeenCalledWith(PartnerModel, partnerModal.partner, partnerModal, form);
        });
    });
});
