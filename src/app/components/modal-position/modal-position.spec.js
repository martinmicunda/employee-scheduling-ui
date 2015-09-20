/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {fakeModal} from '../../../../test/helpers/modal.js';
import position from '../../core/resources/position/fixtures/position_1.json!json';
import PositionModal from './modal-position.js';

describe('ModalPosition', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, ModalModel, PositionModel,
            component = '<modal-position></modal-position>';

        beforeEach(inject((_$compile_, _$rootScope_, _ModalModel_, _PositionModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            ModalModel = _ModalModel_;
            PositionModel = _PositionModel_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have `modal-position` component', () => {
            element = render();

            expect(element.controller('modalPosition')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });

        describe('Show title', () => {
            it('should have `Edit Position` modal title defined when position ID exist', () => {
                spyOn(PositionModel, 'getItem').and.returnValue(position);
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Edit Position');
            });

            it('should have `Add Position` modal title defined when position ID does not exist', () => {
                spyOn(PositionModel, 'getItem').and.returnValue({});
                element = render();
                const title = element.find('h4');

                expect(title.text().trim()).toEqual('Add Position');
            });
        });

        describe('Close modal', () => {
            it('should have `×` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.close')).text()).toEqual('×');
            });

            it('should close the Position modal when `×` button is clicked', () => {
                element = render();
                spyOn(element.isolateScope().vm, 'cancel');

                angular.element(element[0].querySelector('button.close')).triggerHandler('click');

                expect(element.isolateScope().vm.cancel).toHaveBeenCalled();
            });

            it('should have `Close` label defined for close button', () => {
                element = render();

                expect(angular.element(element[0].querySelector('button.btn-white')).text()).toEqual('Close');
            });

            it('should close the Position modal when `Close` button is clicked', () => {
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
                nameInputField.val(position.name);
                nameInputField.triggerHandler('input');

                angular.element(element[0].querySelector('button.btn-success')).triggerHandler('click');

                expect(element.isolateScope().positionForm).toBeDefined();
                expect(element.isolateScope().vm.save).toHaveBeenCalledWith(element.isolateScope().positionForm);
                expect(element.isolateScope().vm.position.name).toEqual(position.name);
                expect(element.isolateScope().positionForm.$valid).toEqual(true);
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
            describe('Name', () => {
                it('should have `Name` label defined', () => {
                    element = render();
                    const parentElement = angular.element(element[0].querySelector('input[name="name"][type="text"]')).parent().parent();

                    expect(parentElement.find('label').text()).toEqual('Name');
                });

                it('should show `name` required error message', () => {
                    element = render();
                    element.triggerHandler('submit');
                    element.isolateScope().positionForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const nameRequiredErrorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="required"]'));

                    expect(nameRequiredErrorMessage.text()).toEqual('This field is required.');
                });

                it('should show `name` maxlength error message', () => {
                    element = render();
                    const nameInputField = angular.element(element[0].querySelector('input[name="name"]'));
                    nameInputField.val('flygvfxmfwqhspfwjyxtzlyqtyucejjowlwrmxatfyyjidwtfpvqiuvqvnrdg');
                    nameInputField.triggerHandler('input');
                    element.triggerHandler('submit');
                    element.isolateScope().positionForm.$submitted = true; // FIXME: why $submitted is not set by triggerHandler?
                    scope.$digest();

                    const nameRequiredErrorMessage = angular.element(element[0].querySelector('input[name="name"][type="text"] ~ div > div[ng-message="maxlength"]'));

                    expect(nameRequiredErrorMessage.text()).toEqual('This field text is too long (max 60 characters).');
                });
            });
        });

    });

    describe('Controller', () => {
        let positionModal, FormService, PositionModel, ModalModel, itemMock = 'itemMock';

        beforeEach(inject((_FormService_, _PositionModel_, _ModalModel_) => {
            ModalModel = _ModalModel_;
            FormService = _FormService_;
            PositionModel = _PositionModel_;
        }));

        it('should have modal property', () => {
            spyOn(ModalModel, 'getItem').and.returnValue(itemMock);
            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            expect(positionModal.modal).toEqual(itemMock);
            expect(ModalModel.getItem).toHaveBeenCalled();
        });

        it('should have position property', () => {
            spyOn(PositionModel, 'getItem').and.returnValue(itemMock);
            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            expect(positionModal.position).toEqual(itemMock);
            expect(PositionModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            expect(positionModal.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            expect(positionModal.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            expect(positionModal.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            positionModal.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            positionModal.save(form);

            expect(positionModal.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        it('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(FormService, 'save');

            positionModal = new PositionModal(ModalModel, PositionModel, FormService);

            positionModal.save(form);

            expect(positionModal.isSubmitting).toEqual(true);
            expect(FormService.save).toHaveBeenCalledWith(PositionModel, positionModal.position, positionModal, form);
        });
    });
});
