/*jshint -W069 */
/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {HEADER_API_VERSION} from '../constants/constants';
import ApiUrlHttpInterceptor from './api-url-http.js';

describe('ApiUrlHttpInterceptor', () => {

    let $injector, apiUrlHttpInterceptor;

    beforeEach(inject((_$injector_) => {
        $injector = _$injector_;

        apiUrlHttpInterceptor = new ApiUrlHttpInterceptor($injector);
    }));

    it(`should have '/api' prefix url`, () => {
        expect(apiUrlHttpInterceptor.apiUrl).toEqual('/api');
    });

    it(`should have '$injector' property`, () => {
        expect(apiUrlHttpInterceptor.$injector).toEqual($injector);
    });

    describe('response()', () => {
        it(`should return 'response.data' object`, () => {
            const respond = {
                config: {
                    headers: {
                        'Content-Type': HEADER_API_VERSION
                    }
                },
                data: ['data']
            };

            expect(apiUrlHttpInterceptor.response(respond)).toEqual(respond.data);
        });

        it(`should return 'response' object`, () => {
            const respond = {
                config: {
                    headers: {}
                }
            };

            expect(apiUrlHttpInterceptor.response(respond)).toEqual(respond);
        });
    });

    describe('responseError()', () => {
        let rejection = {status: 400, config: {}};

        itAsync(`should return rejected object if status is not equal to 503`, () => {
            return apiUrlHttpInterceptor.responseError(rejection).catch((error) => {
                expect(error).toEqual(rejection);
            });
        });

        it(`should set rejection.config.retry to 1 and return rejected object`, () => {
            rejection.status = 503;
            spyOn($injector, 'get').and.callThrough();

            expect(rejection.config.retry).toBeUndefined();
            apiUrlHttpInterceptor.responseError(rejection);
            expect(rejection.config.retry).toEqual(1);

            expect($injector.get).toHaveBeenCalledWith('$http');
        });

        it(`should increase rejection.config.retry each time is called`, () => {
            rejection.status = 503;
            rejection.config.retry = 1;
            spyOn($injector, 'get').and.callThrough();

            expect(rejection.config.retry).toEqual(1);
            apiUrlHttpInterceptor.responseError(rejection);
            expect(rejection.config.retry).toEqual(2);

            expect($injector.get).toHaveBeenCalledWith('$http');
        });

        itAsync(`should return reject object if rejection.config.retry is more or equal than 5`, () => {
            rejection.status = 503;
            rejection.config.retry = 4;
            spyOn($injector, 'get').and.callThrough() ;

            expect(rejection.config.retry).toEqual(4);

            return apiUrlHttpInterceptor.responseError(rejection).catch((error) => {
                expect(error).toEqual(rejection);
                expect(rejection.config.retry).toEqual(5);
                expect($injector.get).not.toHaveBeenCalledWith('$http');
            });
        });
    });

    describe('request()', () => {
        it(`should not prepend api url for none API request`, () => {
            let config = {
                url: 'test.html',
                headers: {}
            };

            let respondConfig = apiUrlHttpInterceptor.request(Object.assign({}, config));
            expect(respondConfig.url).toEqual(config.url);
            expect(respondConfig.headers['Accept']).toBeUndefined();
            expect(respondConfig.headers['Content-Type']).toBeUndefined();
        });

        it(`should prepend api url for API request`, () => {
            let config = {
                url: '/test',
                headers: {}
            };

            let respondConfig = apiUrlHttpInterceptor.request(Object.assign({}, config));
            expect(respondConfig.url).toEqual(apiUrlHttpInterceptor.apiUrl + config.url);
        });

        it(`should set Accept and Content-Type headers for POST request`, () => {
            let config = {
                url: '/test',
                method: 'POST',
                headers: {}
            };

            let respondConfig = apiUrlHttpInterceptor.request(Object.assign({}, config));
            expect(respondConfig.headers['Accept']).toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toEqual(HEADER_API_VERSION);
        });

        it(`should set Accept and Content-Type headers for PUT request`, () => {
            let config = {
                url: '/test',
                method: 'PUT',
                headers: {}
            };

            let respondConfig = apiUrlHttpInterceptor.request(Object.assign({}, config));
            expect(respondConfig.headers['Accept']).toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toEqual(HEADER_API_VERSION);
        });

        it(`should not set Content-Type headers for GET request`, () => {
            let config = {
                url: '/test',
                method: 'GET',
                headers: {}
            };

            let respondConfig = apiUrlHttpInterceptor.request(Object.assign({}, config));
            expect(respondConfig.headers['Accept']).toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toBeUndefined();
        });

        it(`should prepend api url for API request if apiUrl is undefined`, () => {
            let config = {
                url: '/test',
                headers: {}
            };

            apiUrlHttpInterceptor.apiUrl = '';
            let respondConfig = apiUrlHttpInterceptor.request(Object.assign({}, config));
            expect(respondConfig.url).toEqual(config.url);
            expect(respondConfig.headers['Accept']).not.toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toBeUndefined();
        });
    });
});
