/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import HttpRetryInterceptor from './http-retry.js';

describe('HttpRetryInterceptor', () => {

    let $injector = {get: () => {}}, http = () => {}, httpRetryInterceptor, rejection = {status: 400, config: {}};

    beforeEach(() => {
        httpRetryInterceptor = new HttpRetryInterceptor($injector);
    });

    itAsync(`should return rejected object if status is not equal to 503`, () => {
        return httpRetryInterceptor.responseError(rejection).catch((error) => {
            expect(error).toEqual(rejection);
        });
    });

    it(`should set rejection.config.retry to 1 and return rejected object`, () => {
        rejection.status = 503;
        spyOn($injector, 'get').and.returnValue(http);

        expect(rejection.config.retry).toBeUndefined();
        httpRetryInterceptor.responseError(rejection);
        expect(rejection.config.retry).toEqual(1);

        expect($injector.get).toHaveBeenCalledWith('$http');
    });

    it(`should increase rejection.config.retry each time is called`, () => {
        rejection.status = 503;
        rejection.config.retry = 1;
        spyOn($injector, 'get').and.returnValue(http);

        expect(rejection.config.retry).toEqual(1);
        httpRetryInterceptor.responseError(rejection);
        expect(rejection.config.retry).toEqual(2);

        expect($injector.get).toHaveBeenCalledWith('$http');
    });

    itAsync(`should return reject object if rejection.config.retry is more or equal than 5`, () => {
        rejection.status = 503;
        rejection.config.retry = 4;
        spyOn($injector, 'get').and.returnValue(http);

        expect(rejection.config.retry).toEqual(4);

        return httpRetryInterceptor.responseError(rejection).catch((error) => {
            expect(error).toEqual(rejection);
            expect(rejection.config.retry).toEqual(5);
            expect($injector.get).not.toHaveBeenCalledWith('$http');
        });
    });
});
