/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import EmployeeResource from './employee.js';

describe('EmployeeResource', () => {

    let employeeResource, mockData= '$http', route = `employees`;

    beforeEach(() => {
        employeeResource = new EmployeeResource(mockData);
    });

    it(`should have 'http' property set to $http`, () => {
        expect(employeeResource.http).toEqual(mockData);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(employeeResource.route).toEqual(route);
    });
});
