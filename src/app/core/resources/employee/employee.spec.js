/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import EmployeeResource from './employee.js';

describe('EmployeeResource', () => {

    let employeeResource, $http, $httpBackend, email = 'email@test.com', route = `employees`, id = '1', item = {id: id, test: 'test'};

    beforeEach(inject((_$http_, _$httpBackend_) => {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        employeeResource = new EmployeeResource($http);
    }));

    afterEach(inject(($httpBackend) => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it(`should have 'http' property set to $http`, () => {
        expect(employeeResource.http).toEqual($http);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(employeeResource.route).toEqual(route);
    });

    it('should call GET employee by email resource', inject(($httpBackend) => {
        $httpBackend.whenGET(`/${route}/${email}/unique`).respond(() => [200, 'email']);

        employeeResource.getEmployeeByEmail(email).then((respond) => {
            expect(respond.data).toEqual('email');
        });

        $httpBackend.flush();
    }));

    it('should call GET account details with `id`', () => {
        $httpBackend.whenGET(`/${route}/${id}/account`).respond(() => [200, item]);

        employeeResource.getAccountDetails(`${id}`).then((respond) => {
            expect(respond.data).toEqual(item);
        });

        $httpBackend.flush();
    });

    it('should call PUT resource to update account details', () => {
        $httpBackend.whenPUT(`/${route}/${id}/account`, item).respond(() => [200, item]);

        employeeResource.updateAccountDetails(item).then((respond) => {
            expect(respond.data).toEqual(item);
        });

        $httpBackend.flush();
    });
});
