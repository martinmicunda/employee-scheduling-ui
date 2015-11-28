/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {fakeModal} from '../../../../test/helpers/modal.js';
import AvailabilityModal from './modal-availability.js';

describe('ModalAvailability', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, ModalModel,
            component = '<modal-availability></modal-availability>';

        beforeEach(inject((_$compile_, _$rootScope_, _ModalModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            ModalModel = _ModalModel_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should have `modal-availability` component', () => {
            element = render();

            expect(element.controller('modalAvailability')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should have `alert-danger` component defined with attributes `error-message` and `has-error`', () => {
            element = render();

            expect(element.find('alert-danger')[0]).toBeDefined();
            expect(element.find('alert-danger').attr('error-message')).toEqual('vm.errorMessage');
            expect(element.find('alert-danger').attr('has-error')).toEqual('vm.hasError');
        });
    });

    describe('Controller', () => {
        let availabilityModal, FormService, AvailabilityModel, AvailabilityService,
            ModalModel, itemMock = {value: 'itemMock'};

        beforeEach(inject((_FormService_, _AvailabilityModel_, _ModalModel_, _AvailabilityService_) => {
            ModalModel = _ModalModel_;
            FormService = _FormService_;
            AvailabilityModel = _AvailabilityModel_;
            AvailabilityService = _AvailabilityService_;
        }));

        it('should have modal property', () => {
            spyOn(ModalModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.modal).toEqual(itemMock);
            expect(ModalModel.getItem).toHaveBeenCalled();
        });

        it('should have availability property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.availability).toEqual(itemMock);
            expect(AvailabilityModel.getItem).toHaveBeenCalled();
        });

        it('should have availability.repeatType property set to availability.repeatType', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue({repeatType: 'repeatType'});
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.availability.repeatType).toEqual('repeatType');
        });

        it('should have endDate property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue({end: new Date()});
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.endDate).toBeDefined();
        });

        it('should have showEndDate property set to true', () => {
            let endDate = new Date();
            endDate.setDate(endDate.getDate() + 2);
            spyOn(AvailabilityModel, 'getItem').and.returnValue({end: endDate, start: new Date()});
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.showEndDate).toBeDefined();
        });

        it('should have showEndDate property set to false', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue({end: new Date(), start: new Date()});
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.showEndDate).toEqual(false);
        });

        it('should have availability.repeatType property set to repeatTypes[0].id', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue({});
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.availability.repeatType).toEqual(availabilityModal.repeatTypes[0].id);
        });

        it('should have repeatTypes property', () => {
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.repeatTypes).toEqual([{id: '', label: 'Never'}, {id: 'weekly', label: 'Weekly'}]);
        });

        it('should have days property', () => {
            spyOn(AvailabilityService, 'getCalendarDays').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.days).toEqual(itemMock);
            expect(AvailabilityService.getCalendarDays).toHaveBeenCalled();
        });

        it('should have dateOptions property', () => {
            spyOn(AvailabilityService, 'getDatepickerOptions').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.dateOptions).toEqual(itemMock);
            expect(AvailabilityService.getDatepickerOptions).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            expect(availabilityModal.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            availabilityModal.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            availabilityModal.save(form);

            expect(availabilityModal.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(FormService, 'save').and.returnValue(Promise.resolve());
            spyOn(AvailabilityService, 'refreshCalendarData');

            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            return availabilityModal.save(form).then(() => {
                expect(AvailabilityService.refreshCalendarData).toHaveBeenCalled();
                expect(availabilityModal.isSubmitting).toEqual(true);
                expect(FormService.save).toHaveBeenCalledWith(AvailabilityModel, availabilityModal.availability, availabilityModal, form);
            });
        });

        itAsync('should delete availability', () => {
            spyOn(FormService, 'delete').and.returnValue(Promise.resolve());
            spyOn(AvailabilityService, 'refreshCalendarData');

            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

            return availabilityModal.delete(itemMock).then(() => {
                expect(AvailabilityService.refreshCalendarData).toHaveBeenCalled();
                expect(AvailabilityService.refreshCalendarData).toHaveBeenCalled();
                expect(FormService.delete).toHaveBeenCalledWith(AvailabilityModel, itemMock, availabilityModal);
            });
        });

        describe('open', () => {
            let $event = {
                preventDefault: function() {},
                stopPropagation: function() {}
            };

            it('should call preventDefault function', () => {
                spyOn($event, 'preventDefault');

                availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

                availabilityModal.open($event);

                expect($event.preventDefault).toHaveBeenCalled();
            });

            it('should call stopPropagation function', () => {
                spyOn($event, 'stopPropagation');

                availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

                availabilityModal.open($event);

                expect($event.stopPropagation).toHaveBeenCalled();
            });

            it('should call stopPropagation function', () => {
                spyOn($event, 'stopPropagation');

                availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService);

                expect(availabilityModal.opened).toBeUndefined();

                availabilityModal.open($event);

                expect(availabilityModal.opened).toEqual(true);
            });
        });
    });
});
