/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from '../resources/employee/fixtures/employee_1.json!json';
import {PROFILE_COMPLETENESS_TYPES} from '../../core/constants/constants';
import EmployeeModel from './employee.js';

describe('EmployeeModel', () => {

    let employeeModel, mockObject = {test: 'test'}, profileCompleteness = { percentage: '100' };

    beforeEach(() => {
        employeeModel = new EmployeeModel(mockObject);
    });

    it(`should have 'resource' property set to EmployeeModel`, () => {
        expect(employeeModel.resource).toEqual(mockObject);
    });

    it(`should have 'profileCompleteness' property set to empty object`, () => {
        expect(employeeModel.profileCompleteness).toEqual({});
    });

    it(`should get 'profileCompleteness'`, () => {
        employeeModel.profileCompleteness = profileCompleteness;
        expect(employeeModel.getProfileCompleteness()).toEqual(profileCompleteness);
    });

    it(`should calculate profileCompleteness for ACCOUNT type with all required fields fill in`, () => {
        employeeModel.setItem(employee);

        expect(employeeModel.calculateProfileCompleteness()).toEqual(profileCompleteness);
    });

    it(`should calculate profileCompleteness for ACCOUNT type with all required fields not fill in`, () => {
        let employeeClone = Object.assign({}, employee);
        employeeClone.city = '';
        employeeClone.address = '';
        employeeClone.zipCode = '';
        employeeClone.phoneNumber = '';

        employeeModel.setItem(employeeClone);

        expect(employeeModel.calculateProfileCompleteness()).toEqual({ percentage: '50' });
    });

    it(`should calculate profileCompleteness for ACCOUNT type with all required fields fill in`, () => {
        let employeeClone = Object.assign({}, employee);

        employeeModel.setItem(employeeClone);

        expect(employeeModel.calculateProfileCompleteness()).toEqual({ percentage: '100' });
    });

    it(`should calculate profileCompleteness for EMPLOYEE type with all required fields not fill in`, () => {
        let employeeClone = Object.assign({}, {});
        employeeClone.city = '';
        employeeClone.address = '';
        employeeClone.zipCode = '';
        employeeClone.phoneNumber = '';

        employeeModel.setItem(employeeClone);

        expect(employeeModel.calculateProfileCompleteness(PROFILE_COMPLETENESS_TYPES.EMPLOYEE)).toEqual({ percentage: '0' });
    });

    it(`should calculate profileCompleteness for EMPLOYEE type with all required fields fill in`, () => {
        let employeeClone = Object.assign({}, employee);

        employeeModel.setItem(employeeClone);

        expect(employeeModel.calculateProfileCompleteness(PROFILE_COMPLETENESS_TYPES.EMPLOYEE)).toEqual({ percentage: '86' });
    });
});
