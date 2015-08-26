'use strict';

import {USER_ROLES, HEADER_API_VERSION, PROFILE_COMPLETENESS_TYPES} from './constants';

describe('constants', () => {
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

        it('should contain edit-employee completeness type', () => {
            expect(PROFILE_COMPLETENESS_TYPES.EDIT_EMPLOYEE).toEqual('edit-employee');
        });

        it('should contain add-employee completeness type', () => {
            expect(PROFILE_COMPLETENESS_TYPES.ADD_EMPLOYEE).toEqual('add-employee');
        });
    });

    it('should contain header api version', () => {
        expect(HEADER_API_VERSION).toEqual('application/vnd.employee-scheduling.api+json;version=1');
    });
});
