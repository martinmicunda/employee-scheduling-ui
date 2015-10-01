/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import HttpAuthenticationInterceptor from './http-auth.js';

describe('HttpAuthenticationInterceptor', () => {
    let $location = {path: () => {}}, httpAuthenticationInterceptor, TokenModel = {remove: () => {}, get: () => {}}, $injector = {get: () => {}};

    beforeEach(() => {
        httpAuthenticationInterceptor = new HttpAuthenticationInterceptor($location, $injector);
    });

    describe('responseError()', () => {
        let rejection = {status: 400, config: {}};

        itAsync(`should remove token and redirect to login page for 401 status error`, () => {
            rejection.status = 401;
            spyOn($injector, 'get').and.returnValue(TokenModel);
            spyOn(TokenModel, 'remove');
            spyOn($location, 'path');

            return httpAuthenticationInterceptor.responseError(rejection).catch((error) => {
                expect(error).toEqual(rejection);
                expect($injector.get).toHaveBeenCalledWith('TokenModel');
                expect(TokenModel.remove).toHaveBeenCalled();
                expect($location.path).toHaveBeenCalledWith('/');
            });
        });

        itAsync(`should redirect to 403 page for 403 status error`, () => {
            rejection.status = 403;
            spyOn($location, 'path');

            return httpAuthenticationInterceptor.responseError(rejection).catch((error) => {
                expect(error).toEqual(rejection);
                expect($location.path).toHaveBeenCalledWith('/403');
            });
        });

        itAsync(`should return reject object and don't redirect to login or 403 page`, () => {
            rejection.status = 503;
            spyOn($injector, 'get');
            spyOn(TokenModel, 'remove');
            spyOn($location, 'path');

            return httpAuthenticationInterceptor.responseError(rejection).catch((error) => {
                expect(error).toEqual(rejection);
                expect($injector.get).not.toHaveBeenCalled();
                expect(TokenModel.remove).not.toHaveBeenCalled();
                expect($location.path).not.toHaveBeenCalled();
            });
        });
    });

    describe('request()', () => {
        it(`should add token to header if token exist`, () => {
            let config = {}, token = 'token';
            spyOn($injector, 'get').and.returnValue(TokenModel);
            spyOn(TokenModel, 'get').and.returnValue(token);

            let respondConfig = httpAuthenticationInterceptor.request(config);

            expect($injector.get).toHaveBeenCalledWith('TokenModel');
            expect(TokenModel.get).toHaveBeenCalled();

            expect(respondConfig.headers.Authorization).toEqual('Bearer ' + token);
        });

        it(`should not add token to header if token does not exist`, () => {
            let config = {};
            spyOn($injector, 'get').and.returnValue(TokenModel);
            spyOn(TokenModel, 'get');

            let respondConfig = httpAuthenticationInterceptor.request(config);

            expect($injector.get).toHaveBeenCalledWith('TokenModel');
            expect(TokenModel.get).toHaveBeenCalled();
            expect(respondConfig.headers).toBeUndefined();
        });
    });
});
