/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {ACCESS_LEVELS, EMPLOYEE_PROFILE_STATUSES, USER_ROLES, HEADER_API_VERSION, PROFILE_COMPLETENESS_TYPES, AVAILABILITY_DATE_FORMAT} from './constants';

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

    describe('ACCESS_LEVELS', () => {
        it('should contain public access level', () => {
            expect(ACCESS_LEVELS.public).toEqual(['*']);
        });

        it('should contain employee access level', () => {
            expect(ACCESS_LEVELS.employee).toEqual([USER_ROLES.EMPLOYEE, USER_ROLES.SUPERVISOR, USER_ROLES.MANAGER, USER_ROLES.ADMIN]);
        });

        it('should contain supervisor access level', () => {
            expect(ACCESS_LEVELS.supervisor).toEqual([USER_ROLES.SUPERVISOR, USER_ROLES.MANAGER, USER_ROLES.ADMIN]);
        });

        it('should contain manager access level', () => {
            expect(ACCESS_LEVELS.manager).toEqual([USER_ROLES.MANAGER, USER_ROLES.ADMIN]);
        });

        it('should contain admin access level', () => {
            expect(ACCESS_LEVELS.admin).toEqual([USER_ROLES.ADMIN]);
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
        expect(HEADER_API_VERSION).toEqual('application/json');
    });

    it('should contain header api version', () => {
        expect(AVAILABILITY_DATE_FORMAT).toEqual('YYYYMMDD');
    });
});
