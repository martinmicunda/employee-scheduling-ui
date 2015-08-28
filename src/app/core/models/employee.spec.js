/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employee from '../resources/employee/fixtures/employee_1.json!json';
import EmployeeModel from './employee.js';

describe('EmployeeModel', () => {

    let employeeModel, mockObject = {test: 'test'}, profileCompleteness = { percentage: '100' };

    beforeEach(() => {
        employeeModel = new EmployeeModel(mockObject);
    });

    it(`should have 'resource' property set to EmployeeModel`, () => {
        expect(employeeModel.resource).toEqual(mockObject);
    });

    it(`should have 'profileCompleteness' property set to 100%`, () => {
        expect(employeeModel.profileCompleteness).toEqual(profileCompleteness);
    });

    it(`should get 'profileCompleteness'`, () => {
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
});
