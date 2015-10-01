/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import TokenModel from '../models/token.js';
import AuthenticationResource from '../resources/authentication/authentication.js';
import AuthenticationService from './authentication.js';

describe('AuthenticationService', () => {

    let authenticationService, authenticationResource, tokenModel;

    beforeEach(() => {
        tokenModel = new TokenModel();
        authenticationResource = new AuthenticationResource();
    });

    itAsync('should login and set token', () => {
        const credentials = 'credentials', response = {token: 'token'};
        spyOn(authenticationResource, 'login').and.returnValue(Promise.resolve(response));
        spyOn(tokenModel, 'set');

        authenticationService = new AuthenticationService(authenticationResource, tokenModel);

        return authenticationService.login(credentials).then(() => {
            expect(authenticationResource.login).toHaveBeenCalledWith(credentials);
            expect(tokenModel.set).toHaveBeenCalledWith(response.token);
        });
    });

    itAsync('should logout and remove token', () => {
        spyOn(authenticationResource, 'logout').and.returnValue(Promise.resolve());
        spyOn(tokenModel, 'remove');

        authenticationService = new AuthenticationService(authenticationResource, tokenModel);

        return authenticationService.logout().then(() => {
            expect(authenticationResource.logout).toHaveBeenCalled();
            expect(tokenModel.remove).toHaveBeenCalled();
        });
    });

    describe('isAuthorized()', () => {
        it('should get true if user has public access level', () => {
            spyOn(tokenModel, 'get');
            spyOn(tokenModel, 'getCurrentUser');
            authenticationService = new AuthenticationService(authenticationResource, tokenModel);

            const isAuthorized = authenticationService.isAuthorized(['*']);

            expect(isAuthorized).toEqual(true);
            expect(tokenModel.get).not.toHaveBeenCalled();
            expect(tokenModel.getCurrentUser).not.toHaveBeenCalled();
        });

        it('should get true if user role is in access level and user authenticated', () => {
            spyOn(tokenModel, 'get').and.returnValue('user');
            spyOn(tokenModel, 'getCurrentUser').and.returnValue({role: 'admin'});
            authenticationService = new AuthenticationService(authenticationResource, tokenModel);

            const isAuthenticated = authenticationService.isAuthorized(['admin']);

            expect(isAuthenticated).toEqual(true);
            expect(tokenModel.get).toHaveBeenCalled();
            expect(tokenModel.getCurrentUser).toHaveBeenCalled();
        });

        it('should get false if user role is in access level and user is not authenticated', () => {
            spyOn(tokenModel, 'get').and.returnValue(undefined);
            spyOn(tokenModel, 'getCurrentUser').and.returnValue({role: 'admin'});
            authenticationService = new AuthenticationService(authenticationResource, tokenModel);

            const isAuthenticated = authenticationService.isAuthorized(['admin']);

            expect(isAuthenticated).toEqual(false);
            expect(tokenModel.get).toHaveBeenCalled();
        });

        it('should get false if user role is not in access level and is user authenticated', () => {
            spyOn(tokenModel, 'get').and.returnValue('user');
            spyOn(tokenModel, 'getCurrentUser').and.returnValue({role: 'user'});
            authenticationService = new AuthenticationService(authenticationResource, tokenModel);

            const isAuthenticated = authenticationService.isAuthorized(['admin']);

            expect(isAuthenticated).toEqual(false);
            expect(tokenModel.get).toHaveBeenCalled();
        });
    });

    describe('isAuthenticated()', () => {
        it('should get true if user is authenticated', () => {
            spyOn(tokenModel, 'get').and.returnValue('user');
            authenticationService = new AuthenticationService(authenticationResource, tokenModel);

            const isAuthenticated = authenticationService.isAuthenticated();

            expect(isAuthenticated).toEqual(true);
            expect(tokenModel.get).toHaveBeenCalled();
        });

        it('should get false if user is not authenticated', () => {
            spyOn(tokenModel, 'get').and.returnValue(undefined);
            authenticationService = new AuthenticationService(authenticationResource, tokenModel);

            const isAuthenticated = authenticationService.isAuthenticated();

            expect(isAuthenticated).toEqual(false);
            expect(tokenModel.get).toHaveBeenCalled();
        });
    });

    it('should get current user', () => {
        spyOn(tokenModel, 'getCurrentUser').and.returnValue('user');
        authenticationService = new AuthenticationService(authenticationResource, tokenModel);

        const currentUser = authenticationService.getCurrentUser();

        expect(currentUser).toEqual('user');
        expect(tokenModel.getCurrentUser).toHaveBeenCalled();
    });
});
