/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import TokenModel from './token.js';

describe('SettingModel', () => {

    let tokenModel, $window = {atob: () => {}}, localStorageService = {get: () => {}, set: () => {}, remove: () => {}},
        tokenStorageKey = 'token', currentUserStorageKey = 'user', decodedUser = {user: 'user'}, decodedUserJSON = '{"user": "user"}', encodedUser = 'e3VzZXI6ICd1c2VyJ30',
        token = `xxx.${encodedUser}.zzz`;

    beforeEach(() => {
        tokenModel = new TokenModel($window, localStorageService);
    });

    it(`should have 'cachedToken' property set to null`, () => {
        expect(tokenModel.cachedToken).toEqual(null);
    });

    it(`should have 'tokenStorageKey' property set to 'token'`, () => {
        expect(tokenModel.tokenStorageKey).toEqual(tokenStorageKey);
    });

    it(`should have 'cachedCurrentUser' property set to null`, () => {
        expect(tokenModel.cachedCurrentUser).toEqual(null);
    });

    it(`should have 'currentUserStorageKey' property set to 'user'`, () => {
        expect(tokenModel.currentUserStorageKey).toEqual('user');
    });

    describe('set()', () => {
        it(`should set token to cache and locale storage`, () => {
            spyOn(localStorageService, 'set');
            spyOn($window, 'atob').and.returnValue(decodedUserJSON);
            tokenModel = new TokenModel($window, localStorageService);

            tokenModel.set(token);

            expect(tokenModel.cachedToken).toEqual(token);
            expect($window.atob).toHaveBeenCalledWith(encodedUser);
            expect(localStorageService.set).toHaveBeenCalledWith(tokenStorageKey, token);
        });

        it(`should set user to cache and locale storage`, () => {
            spyOn(localStorageService, 'set');
            spyOn($window, 'atob').and.returnValue(decodedUserJSON);
            tokenModel = new TokenModel($window, localStorageService);

            tokenModel.set(token);

            expect(tokenModel.cachedCurrentUser).toEqual(decodedUser);
            expect($window.atob).toHaveBeenCalledWith(encodedUser);
            expect(localStorageService.set).toHaveBeenCalledWith(currentUserStorageKey, tokenModel.cachedCurrentUser);
        });

        it(`should throw error when token has not 3 parts`, () => {
            tokenModel = new TokenModel($window, localStorageService);

            expect(() => tokenModel.set('invalid-token')).toThrowError(Error, 'JWT must have 3 parts');
        });

        it(`should throw error when token is not decoded properly`, () => {
            tokenModel = new TokenModel($window, localStorageService);

            expect(() => tokenModel.set('xxx.invalid-token.zzz')).toThrowError(Error, 'Cannot decode the token');
        });
    });

    describe('get()', () => {
        it(`should get token from locale storage`, () => {
            spyOn(localStorageService, 'get').and.returnValue('token-test');
            tokenModel = new TokenModel($window, localStorageService);

            expect(tokenModel.get()).toEqual('token-test');
            expect(localStorageService.get).toHaveBeenCalledWith(tokenStorageKey);
        });

        it(`should get token from cache`, () => {
            spyOn(localStorageService, 'get');
            tokenModel = new TokenModel($window, localStorageService);
            tokenModel.cachedToken = 'token-test';

            expect(tokenModel.get()).toEqual('token-test');
            expect(localStorageService.get).not.toHaveBeenCalled();
        });
    });

    describe('getCurrentUser()', () => {
        it(`should get user from locale storage`, () => {
            spyOn(localStorageService, 'get').and.returnValue('user-test');
            tokenModel = new TokenModel($window, localStorageService);

            expect(tokenModel.getCurrentUser()).toEqual('user-test');
            expect(localStorageService.get).toHaveBeenCalledWith(currentUserStorageKey);
        });

        it(`should get user from cache`, () => {
            spyOn(localStorageService, 'get');
            tokenModel = new TokenModel($window, localStorageService);
            tokenModel.cachedCurrentUser = 'user-test';

            expect(tokenModel.getCurrentUser()).toEqual('user-test');
            expect(localStorageService.get).not.toHaveBeenCalled();
        });
    });

    describe('remove()', () => {
        it(`should remove token from cache and locale storage`, () => {
            spyOn(localStorageService, 'remove');
            tokenModel = new TokenModel($window, localStorageService);
            tokenModel.cachedToken = 'token-test';

            tokenModel.remove();

            expect(tokenModel.cachedToken).toEqual(null);
            expect(localStorageService.remove).toHaveBeenCalledWith(tokenStorageKey);
        });

        it(`should remove user from cache and locale storage`, () => {
            spyOn(localStorageService, 'remove');
            tokenModel = new TokenModel($window, localStorageService);
            tokenModel.cachedCurrentUser = 'user-test';

            tokenModel.remove();

            expect(tokenModel.cachedCurrentUser).toEqual(null);
            expect(localStorageService.remove).toHaveBeenCalledWith(currentUserStorageKey);
        });
    });
});
