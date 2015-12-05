/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import moment from 'moment';
import {fakeModal} from '../../../../test/helpers/modal.js';
import AvailabilityModal from './modal-availability.js';
import {AVAILABILITY_DATE_FORMAT} from '../../core/constants/constants';

describe('ModalAvailability', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, ModalModel,
            component = '<modal-availability></modal-availability>',
            itemMock = {start: moment(), end: moment().add(2, 'day'), availability: 'available', employeeId: 'employeeId'};

        beforeEach(inject((_$compile_, _$rootScope_, _ModalModel_, AvailabilityModel) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            ModalModel = _ModalModel_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);

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
        let availabilityModal, FormService, AvailabilityModel, AvailabilityService, AvailabilityResource,
            ModalModel, itemMock = {start: moment(), end: moment().add(2, 'day'), availability: 'available', employeeId: 'employeeId'};

        beforeEach(inject((_FormService_, _AvailabilityModel_, _ModalModel_, _AvailabilityService_, _AvailabilityResource_) => {
            ModalModel = _ModalModel_;
            FormService = _FormService_;
            AvailabilityModel = _AvailabilityModel_;
            AvailabilityService = _AvailabilityService_;
            AvailabilityResource = _AvailabilityResource_;

            spyOn(ModalModel, 'getItem').and.returnValue(fakeModal);
        }));

        it('should have modal property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.modal).toEqual(fakeModal);
            expect(ModalModel.getItem).toHaveBeenCalled();
        });

        it('should have availability property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.availability).toEqual(itemMock);
            expect(AvailabilityModel.getItem).toHaveBeenCalled();
        });

        it('should have startDate property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.startDate).toEqual(itemMock.start.format('ddd, D MMMM'));
        });

        it('should have dateRangeLength property equal 2', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.dateRangeLength).toEqual(2);
        });

        it('should have dateRangeLength property equal 0', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue({start: moment(), end: moment()});
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.dateRangeLength).toEqual(0);
        });

        it('should have endDate property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            const endDate = moment(itemMock.end); // make `this.availability.end` object immutable for subtract function
            endDate.subtract(1, 'day');

            expect(availabilityModal.endDate).toEqual(endDate.format('ddd, D MMMM'));
        });

        it('should have isSubmitting property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            spyOn(FormService, 'getModalSaveButtonOptions').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            expect(availabilityModal.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getModalSaveButtonOptions).toHaveBeenCalled();
        });

        it('should cancel modal', () => {
            spyOn(fakeModal, 'dismiss');
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            availabilityModal.cancel();

            expect(fakeModal.dismiss).toHaveBeenCalledWith('cancel');
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(AvailabilityResource, 'create');
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            availabilityModal.save(form);

            expect(availabilityModal.isSubmitting).toEqual(null);
            expect(AvailabilityResource.create).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true, $setPristine: () => {}};
            const availability = {availability: itemMock.availability, start: itemMock.start.format(AVAILABILITY_DATE_FORMAT), end: itemMock.end.format(AVAILABILITY_DATE_FORMAT), employeeId: itemMock.employeeId};
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            spyOn(AvailabilityResource, 'create').and.returnValue(Promise.resolve());
            spyOn(AvailabilityService, 'createOrReplaceAvailabilities');
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onSuccess');

            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            return availabilityModal.save(form).then(() => {
                expect(availabilityModal.isSubmitting).toEqual(true);
                expect(AvailabilityResource.create).toHaveBeenCalledWith(availability);
                expect(AvailabilityService.createOrReplaceAvailabilities).toHaveBeenCalledWith(availabilityModal.dateRangeLength, availabilityModal.availability);

                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onSuccess).toHaveBeenCalledWith(availabilityModal);
            });
        });

        it('should save with `note` property if exist', () => {
            let form = {$valid: true, $setPristine: () => {}};
            const clonedAvailability = Object.assign({}, itemMock);
            clonedAvailability.note = 'note';
            const availability = {availability: clonedAvailability.availability, start: clonedAvailability.start.format(AVAILABILITY_DATE_FORMAT), end: clonedAvailability.end.format(AVAILABILITY_DATE_FORMAT), employeeId: clonedAvailability.employeeId, note: clonedAvailability.note};
            spyOn(AvailabilityModel, 'getItem').and.returnValue(clonedAvailability);
            spyOn(AvailabilityResource, 'create').and.returnValue(Promise.resolve());
            spyOn(AvailabilityService, 'createOrReplaceAvailabilities');

            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            availabilityModal.save(form);

            expect(AvailabilityResource.create).toHaveBeenCalledWith(availability);
        });

        itAsync('should not save if there is failure', () => {
            let form = {$valid: true, $setPristine: () => {}};
            spyOn(AvailabilityModel, 'getItem').and.returnValue(itemMock);
            spyOn(AvailabilityResource, 'create').and.returnValue(Promise.reject('error'));
            spyOn(form, '$setPristine');
            spyOn(FormService, 'onFailure');

            availabilityModal = new AvailabilityModal(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource);

            return availabilityModal.save(form).then(() => {
                expect(form.$setPristine).toHaveBeenCalled();
                expect(FormService.onFailure).toHaveBeenCalledWith(availabilityModal, 'error');
            });
        });
    });
});
