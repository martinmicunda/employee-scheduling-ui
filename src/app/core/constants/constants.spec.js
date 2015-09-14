/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {EMPLOYEE_PROFILE_STATUSES, USER_ROLES, HEADER_API_VERSION, PROFILE_COMPLETENESS_TYPES} from './constants';

describe('constants', () => {
    describe('EMPLOYEE_PROFILE_STATUSES', () => {
        it('should contain active employee profile status', () => {
            expect(EMPLOYEE_PROFILE_STATUSES.ACTIVE).toEqual('active');
        });

        it('should contain inactive employee profile status', () => {
            expect(EMPLOYEE_PROFILE_STATUSES.INACTIVE).toEqual('inactive');
        });

        it('should contain pending employee profile status', () => {
            expect(EMPLOYEE_PROFILE_STATUSES.PENDING).toEqual('pending');
        });
    });

    describe('USER_ROLES', () => {
        it('should contain admin role', () => {
            expect(USER_ROLES.ADMIN).toEqual('admin');
        });

        it('should contain manager role', () => {
            expect(USER_ROLES.MANAGER).toEqual('manager');
        });

        it('should contain buyer role', () => {
            expect(USER_ROLES.EMPLOYEE).toEqual('employee');
        });
    });

    describe('PROFILE_COMPLETENESS_TYPES', () => {
        it('should contain account completeness type', () => {
            expect(PROFILE_COMPLETENESS_TYPES.ACCOUNT).toEqual('account');
        });

        it('should contain employee completeness type', () => {
            expect(PROFILE_COMPLETENESS_TYPES.EMPLOYEE).toEqual('employee');
        });
    });

    it('should contain header api version', () => {
        expect(HEADER_API_VERSION).toEqual('application/vnd.employee-scheduling.api+json;version=1');
    });
});
