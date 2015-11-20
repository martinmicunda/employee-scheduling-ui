/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular-mocks';
import AuthenticationResource from './authentication.js';

describe('AuthenticationResource', () => {

    let authenticationResource, $http, $httpBackend, $window = {btoa: () => {}},
        route = `auth`, data = {test: 'data'}, dataEncoded = 'J3sidGVzdCI6ICJkYXRhIn0n';

    beforeEach(inject((_$http_, _$httpBackend_) => {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        authenticationResource = new AuthenticationResource($http, $window);
    }));

    it(`should have 'http' property set to $http`, () => {
        expect(authenticationResource.http).toEqual($http);
    });

    it(`should have 'route' property set to '${route}'`, () => {
        expect(authenticationResource.route).toEqual(route);
    });

    it('should call GET logout resource', () => {
        $httpBackend.whenGET(`/${route}/logout`).respond(() => [200]);

        authenticationResource.logout().then((respond) => {
            expect(respond.status).toEqual(200);
        });

        $httpBackend.flush();
    });

    it('should call POST login resource', () => {
        spyOn($window, 'btoa').and.returnValue(dataEncoded);
        $httpBackend.whenPOST(`/${route}/login`, {credentials: dataEncoded}).respond(() => [200]);

        authenticationResource.login(data).then((respond) => {
            expect(respond.status).toEqual(200);
        });

        $httpBackend.flush();
    });

    it('should call POST forgot password resource', () => {
        spyOn($window, 'btoa').and.returnValue(dataEncoded);
        $httpBackend.whenPOST(`/${route}/forgot`, {email: 'email'}).respond(() => [200]);

        authenticationResource.forgotPassword('email').then((respond) => {
            expect(respond.status).toEqual(200);
        });

        $httpBackend.flush();
    });

    it('should call POST password resource', () => {
        spyOn($window, 'btoa').and.returnValue(dataEncoded);
        $httpBackend.whenPOST(`/${route}/password/token`, {credentials: dataEncoded}).respond(() => [200]);

        authenticationResource.resetPassword(data, 'token').then((respond) => {
            expect(respond.status).toEqual(200);
        });

        $httpBackend.flush();
    });

    it('should call PUT password resource', () => {
        spyOn($window, 'btoa').and.returnValue(dataEncoded);
        $httpBackend.whenPUT(`/${route}/password/id`, {credentials: dataEncoded}).respond(() => [200]);

        authenticationResource.updatePassword(data, 'id').then((respond) => {
            expect(respond.status).toEqual(200);
        });

        $httpBackend.flush();
    });
});
