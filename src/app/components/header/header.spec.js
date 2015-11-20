/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS, USER_ROLES} from '../../core/constants/constants.js';
import Header from './header.js';

describe('Header', () => {
    let component = '<header></header>';

    beforeEach(angular.mock.module('ngDecorator'));

    describe('Component', () => {
        let $compile, $rootScope, scope, render, element, AuthenticationService;

        beforeEach(inject((_$compile_, _$rootScope_, _AuthenticationService_, SettingResource) => {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $rootScope.ACCESS_LEVELS = ACCESS_LEVELS;
            scope = $rootScope.$new();
            AuthenticationService = _AuthenticationService_;

            spyOn(AuthenticationService, 'isAuthenticated').and.returnValue(true);
            spyOn(SettingResource, 'get').and.returnValue({});

            render = () => {
                let element = angular.element(component);
                let compiledElement = $compile(element)(scope);
                $rootScope.$digest();

                return compiledElement;
            };
        }));

        it('should contain header component', () => {
            spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
            element = render();

            expect(element.controller('header')).toBeDefined();
            expect(element['0']).not.toEqual(component);
        });

        describe('navigation', () => {
            describe('Schedule', () => {
                it('should contain Schedule label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(1) a'));

                    expect(nav.text().trim()).toEqual('Schedule');
                });

                it('should redirect to Schedule page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(1) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.schedule');
                });
            });

            describe('Availability', () => {
                it('should contain Availability label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(2) a'));

                    expect(nav.text().trim()).toEqual('Availability');
                });

                it('should redirect to Availability page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(2) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.availability');
                });
            });

            describe('Documents', () => {
                it('should contain Documents label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(3) a'));

                    expect(nav.text().trim()).toEqual('Documents');
                });

                it('should redirect to Documents page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(3) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.documents');
                });
            });

            describe('Employees', () => {
                it('should contain Employees label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(4) a'));

                    expect(nav.text().trim()).toEqual('Employees');
                });

                it('should redirect to Employees page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});

                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(4) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.employees');
                });

                it(`should not display employees link for ${USER_ROLES.EMPLOYEE} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(4) a'));

                    expect(nav).toEqual({});
                });

                it(`should not display employees link for ${USER_ROLES.SUPERVISOR} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.SUPERVISOR});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(4) a'));

                    expect(nav).toEqual({});
                });

                it(`should display employees link for ${USER_ROLES.MANAGER} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.MANAGER});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(4) a'));

                    expect(nav[0]).toBeDefined();
                });
            });

            describe('Partners', () => {
                it('should contain Partners label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(5) a'));

                    expect(nav.text().trim()).toEqual('Partners');
                });

                it('should redirect to Partners page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});

                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(5) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.partners');
                });

                it(`should not display partners link for ${USER_ROLES.EMPLOYEE} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(5) a'));

                    expect(nav).toEqual({});
                });

                it(`should not display partners link for ${USER_ROLES.SUPERVISOR} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.SUPERVISOR});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(5) a'));

                    expect(nav).toEqual({});
                });

                it(`should display partners link for ${USER_ROLES.MANAGER} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.MANAGER});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(5) a'));

                    expect(nav[0]).toBeDefined();
                });
            });

            describe('Reports', () => {
                it('should contain Reports label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(6) a'));

                    expect(nav.text().trim()).toEqual('Reports');
                });

                it('should redirect to Reports page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});

                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(6) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.reports');
                });

                it(`should not display reports link for ${USER_ROLES.EMPLOYEE} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(6) a'));

                    expect(nav).toEqual({});
                });

                it(`should not display reports link for ${USER_ROLES.SUPERVISOR} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.SUPERVISOR});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(6) a'));

                    expect(nav).toEqual({});
                });

                it(`should not display reports link for ${USER_ROLES.MANAGER} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.MANAGER});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.navbar-nav.navbar-left li:nth-child(6) a'));

                    expect(nav).toEqual({});
                });
            });

            describe('My Account', () => {
                it('should contain My Account label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(1) a'));

                    expect(nav.text().trim()).toEqual('My Account');
                });

                it('should redirect to My Account page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(1) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.account.account-details');
                });
            });

            describe('App Settings', () => {
                it('should contain App Settings label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(2) a'));

                    expect(nav.text().trim()).toEqual('App Settings');
                });

                it('should redirect to App Settings page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});

                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(2) a'));

                    expect(nav.attr('ui-sref')).toEqual('app.settings.positions');
                });

                it(`should not display App Settings link for ${USER_ROLES.EMPLOYEE} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.EMPLOYEE});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(2) a'));

                    expect(nav).toEqual({});
                });

                it(`should not display App Settings link for ${USER_ROLES.SUPERVISOR} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.SUPERVISOR});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(2) a'));

                    expect(nav).toEqual({});
                });

                it(`should not display App Settings link for ${USER_ROLES.MANAGER} role`, () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.MANAGER});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(2) a'));

                    expect(nav).toEqual({});
                });
            });

            describe('Log Out', () => {
                it('should contain Log Out label', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(4) a'));

                    expect(nav.text().trim()).toEqual('Log Out');
                });

                it('should redirect to Log Out page', () => {
                    spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                    element = render();
                    spyOn(element.isolateScope().vm, 'logout');

                    const nav = angular.element(element[0].querySelector('.dropdown-menu li:nth-child(4) a'));

                    nav.triggerHandler('click');

                    expect(element.isolateScope().vm.logout).toHaveBeenCalled();
                });
            });

            it('should display user firstName and lastName', () => {
                spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                $rootScope.currentUser = {firstName: 'firstName', lastName: 'lastName'};

                element = render();

                expect(angular.element(element[0].querySelector('.hidden-sm')).text()).toEqual($rootScope.currentUser.firstName + ' ' + $rootScope.currentUser.lastName);
            });

            it('should display user avatar', () => {
                spyOn(AuthenticationService, 'getCurrentUser').and.returnValue({role: USER_ROLES.ADMIN});
                $rootScope.currentUser = {avatar: 'https://raw.githubusercontent.com/martinmicunda/employee-scheduling-ui/master/src/images/me.jpg'};

                element = render();

                expect(angular.element(element[0].querySelector('.img-circle')).attr('src')).toEqual($rootScope.currentUser.avatar);
            });
        });
    });

    describe('Controller', () => {
        let $state, AuthenticationService;

        beforeEach(inject((_$state_, _AuthenticationService_) => {
            $state = _$state_;
            AuthenticationService = _AuthenticationService_;
        }));

        itAsync('should redirect to auth.login state after successful logout', () => {
            spyOn($state, 'go');
            spyOn(AuthenticationService, 'logout').and.returnValue(Promise.resolve());
            let header = new Header($state, AuthenticationService);

            return header.logout().then(() => {
                expect($state.go).toHaveBeenCalledWith('auth.login');
                expect(AuthenticationService.logout).toHaveBeenCalled();
            });
        });
    });
});
