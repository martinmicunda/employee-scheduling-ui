/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import EmployeeResource from './employee.js';

describe('EmployeeResource', () => {

    let employeeResource, $http, email = 'email@test.com', route = `employees`;

    beforeEach(inject((_$http_) => {
        $http = _$http_;
        employeeResource = new EmployeeResource($http);
    }));

    it(`should have 'http' property set to $http`, () => {
        expect(employeeResource.http).toEqual($http);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(employeeResource.route).toEqual(route);
    });

    it('should call GET employee by email resource', inject(($httpBackend) => {
        $httpBackend.whenGET(`/${route}?email=${email}`).respond(() => [200, 'email']);

        employeeResource.getEmployeeByEmail(email).then((respond) => {
            expect(respond.data).toEqual('email');
        });

        $httpBackend.flush();
    }));
});
