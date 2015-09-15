/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import ContactDetails from './contact-details.js';

describe('ContactDetails', () => {
    let component = '<contact-details></contact-details>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Route', () => {
        let url = '/account/contact-details',
            state = 'app.account.contact-details',
            currentState,
            $state, $injector;

        beforeEach(inject(( _$state_, _$injector_) => {
            $state = _$state_;
            $injector = _$injector_;

            currentState = $state.get(state);
        }));

        it('should have component named `contact-details`', () => {
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

        it('should contain contact-details component', () => {
            element = render();

            expect(element.controller('contactDetails')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });
    });

    describe('Controller', () => {
        let contactDetails, FormService, EmployeeModel, itemMock = 'itemMock';

        beforeEach(inject((_FormService_, _EmployeeModel_) => {
            FormService = _FormService_;
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have employee property', () => {
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            contactDetails = new ContactDetails(EmployeeModel, FormService);

            expect(contactDetails.employee).toEqual(itemMock);
            expect(EmployeeModel.getItem).toHaveBeenCalled();
        });

        it('should have isSubmitting property', () => {
            contactDetails = new ContactDetails(EmployeeModel, FormService);

            expect(contactDetails.isSubmitting).toEqual(null);
        });

        it('should have result property', () => {
            contactDetails = new ContactDetails(EmployeeModel, FormService);

            expect(contactDetails.result).toEqual(null);
        });

        it('should have saveButtonOptions property', () => {
            spyOn(FormService, 'getSaveButtonOptions').and.returnValue(itemMock);
            contactDetails = new ContactDetails(EmployeeModel, FormService);

            expect(contactDetails.saveButtonOptions).toEqual(itemMock);
            expect(FormService.getSaveButtonOptions).toHaveBeenCalled();
        });

        it('should not save if form is invalid', () => {
            let form = {$valid: false};
            spyOn(FormService, 'save');
            contactDetails = new ContactDetails(EmployeeModel, FormService);

            contactDetails.save(form);

            expect(contactDetails.isSubmitting).toEqual(null);
            expect(FormService.save).not.toHaveBeenCalled();
        });

        itAsync('should save if form is valid', () => {
            let form = {$valid: true};
            spyOn(FormService, 'save').and.returnValue(Promise.resolve());
            spyOn(EmployeeModel, 'getItem').and.returnValue(itemMock);
            spyOn(EmployeeModel, 'calculateProfileCompleteness');
            contactDetails = new ContactDetails(EmployeeModel, FormService);

            return contactDetails.save(form).then(() => {
                expect(contactDetails.isSubmitting).toEqual(true);
                expect(FormService.save).toHaveBeenCalledWith(EmployeeModel, contactDetails.employee, contactDetails, form);
                expect(EmployeeModel.calculateProfileCompleteness).toHaveBeenCalled();
            });
        });
    });
});
