/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import ProfileCompletenessBar from './profile-completeness-bar.js';

describe('ProfileCompletenessBar', () => {

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, EmployeeModel,
            component = '<profile-completeness-bar></profile-completeness-bar>';

        beforeEach(inject((_$compile_, _$rootScope_, _EmployeeModel_) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            scope = $rootScope.$new();
            EmployeeModel = _EmployeeModel_;

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should contain profile-completeness-bar component', () => {
            element = render();

            expect(element.controller('profileCompletenessBar')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        it('should render with `progress-bar-success` class when percentage is >= 70', () => {
            spyOn(EmployeeModel, 'getProfileCompleteness').and.returnValue({percentage: 70});
            element = render();
            const profileCompleteness = angular.element(element[0].getElementsByClassName('progress-bar'));

            expect(profileCompleteness.hasClass('progress-bar-success')).toEqual(true);
            expect(profileCompleteness.hasClass('progress-bar-warning')).toEqual(false);
            expect(profileCompleteness.hasClass('progress-bar-danger')).toEqual(false);
        });

        it('should render with `progress-bar-warning` class when percentage is < 70 and >= 40', () => {
            spyOn(EmployeeModel, 'getProfileCompleteness').and.returnValue({percentage: 69});
            element = render();
            const profileCompleteness = angular.element(element[0].getElementsByClassName('progress-bar'));

            expect(profileCompleteness.hasClass('progress-bar-success')).toEqual(false);
            expect(profileCompleteness.hasClass('progress-bar-warning')).toEqual(true);
            expect(profileCompleteness.hasClass('progress-bar-danger')).toEqual(false);
        });

        it('should render with `progress-bar-danger` class when percentage is < 40', () => {
            spyOn(EmployeeModel, 'getProfileCompleteness').and.returnValue({percentage: 39});
            element = render();
            const profileCompleteness = angular.element(element[0].getElementsByClassName('progress-bar'));

            expect(profileCompleteness.hasClass('progress-bar-success')).toEqual(false);
            expect(profileCompleteness.hasClass('progress-bar-warning')).toEqual(false);
            expect(profileCompleteness.hasClass('progress-bar-danger')).toEqual(true);
        });

        it('should render with style `with` set to profile completeness percentage', () => {
            spyOn(EmployeeModel, 'getProfileCompleteness').and.returnValue({percentage: 39});
            element = render();
            const profileCompleteness = angular.element(element[0].getElementsByClassName('progress-bar'));

            expect(profileCompleteness.css('width')).toEqual('39%');
        });

        it('should render the profile completeness percentage', () => {
            spyOn(EmployeeModel, 'getProfileCompleteness').and.returnValue({percentage: 100});
            element = render();
            const profileCompleteness = angular.element(element[0].querySelector('p.text-muted .pull-right'));

            expect(profileCompleteness.text()).toEqual('100%');
        });

        it('should have `Profile completeness` label defined', () => {
            element = render();
            const profileCompletenessLabel = angular.element(element[0].querySelector('p.text-muted .pull-left'));

            expect(profileCompletenessLabel.text()).toEqual('Profile completeness');
        });
    });

    describe('Controller', () => {
        let profileCompletenessBar, EmployeeModel, itemMock = 'profileCompleteness';

        beforeEach(inject((_EmployeeModel_) => {
            EmployeeModel = _EmployeeModel_;
        }));

        it('should have profileCompleteness property', () => {
            spyOn(EmployeeModel, 'getProfileCompleteness').and.returnValue(itemMock);
            profileCompletenessBar = new ProfileCompletenessBar(EmployeeModel);

            expect(profileCompletenessBar.profileCompleteness).toEqual(itemMock);
            expect(EmployeeModel.getProfileCompleteness).toHaveBeenCalled();
        });
    });
});
