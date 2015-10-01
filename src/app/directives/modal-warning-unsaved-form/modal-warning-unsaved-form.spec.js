/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import {MmModalWarningUnsavedForm, UnsavedFormsService} from './modal-warning-unsaved-form.js';

describe('MmModalWarningUnsavedForm', () => {

    describe('UnsavedFormsService', () => {
        let unsavedFormsService;

        beforeEach(() => {
            unsavedFormsService = new UnsavedFormsService();
        });

        it('should contain forms property set to []', () => {
            expect(unsavedFormsService.forms).toEqual([]);
        });

        it('should add form', () => {
            unsavedFormsService.add('form1');

            expect(unsavedFormsService.forms).toEqual(['form1']);
        });

        it('should remove form', () => {
            unsavedFormsService.forms = ['form1', 'form2'];

            unsavedFormsService.remove('form1');

            expect(unsavedFormsService.forms).toEqual(['form2']);
        });

        describe('areFormsClean()', () => {
            it('should return true if there are no forms', () => {
                expect(unsavedFormsService.areFormsClean()).toEqual(true);
            });

            it('should return false if user has already interacted with the form', () => {
                unsavedFormsService.forms = [{$dirty: true}, {$dirty: true}];

                expect(unsavedFormsService.areFormsClean()).toEqual(false);
            });

            it('should return true and remove any non dirty form from `forms` array', () => {
                unsavedFormsService.forms = [{$dirty: false, name: 'form1'}, {$dirty: false, name: 'form2'}];

                expect(unsavedFormsService.areFormsClean()).toEqual(true);
                expect(unsavedFormsService.forms.length).toEqual(0);
            });
        });
    });

    describe('MmModalWarningUnsavedForm', () => {
        beforeEach(angular.mock.module('ngDecorator'));

        let $compile, $modal, $rootScope, scope, render, element, controller, UnsavedFormsService,
            component = `
              <form name="testForm" mm-modal-warning-unsaved-form>
                  <input type="text" ng-model="vm.test"/>
              </form>
            `;

        beforeEach(inject((_$compile_, _$modal_, _$rootScope_, _UnsavedFormsService_) => {
            $modal = _$modal_;
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            UnsavedFormsService = _UnsavedFormsService_;

            controller = MmModalWarningUnsavedForm.directiveFactory();

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should contain require property set to ^form', () => {
            element = render();

            expect(controller.require).toEqual('^form');
        });

        it('should contain restrict property set to A', () => {
            element = render();

            expect(controller.restrict).toEqual('A');
        });

        it('should contain scope property', () => {
            element = render();

            expect(controller.scope).toEqual({
                resetForm: '&mmModalWarningUnsavedForm'
            });
        });

        it('should add from service to array', () => {
            spyOn(UnsavedFormsService, 'add');
            element = render();

            expect(UnsavedFormsService.add).toHaveBeenCalledWith(element.scope().testForm);
        });

        it('should not open modal if forms are not clean', () => {
            const toState = {name: 'test'};
            spyOn(UnsavedFormsService, 'areFormsClean').and.returnValue(true);
            spyOn($modal, 'open');
            element = render();

            const event = scope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

            expect(event.defaultPrevented).toEqual(false);
            expect(UnsavedFormsService.areFormsClean).toHaveBeenCalled();
            expect($modal.open).not.toHaveBeenCalled();
        });

        it('should open modal if forms are clean', () => {
            const toState = {name: 'test'};
            spyOn(UnsavedFormsService, 'areFormsClean').and.returnValue(false);
            spyOn($modal, 'open');
            element = render();

            const event = scope.$broadcast('$stateChangeStart', toState); // the first argument is reserved for the event object (that's why we are not passing event object here)

            expect(event.defaultPrevented).toEqual(true);
            expect(UnsavedFormsService.areFormsClean).toHaveBeenCalled();
            expect($modal.open).toHaveBeenCalled();
        });
    });
});
