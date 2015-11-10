/*jshint -W069 */
/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {HEADER_API_VERSION} from '../constants/constants';
import HttpApiUrlInterceptor from './http-api-url.js';

describe('HttpApiUrlInterceptor', () => {

    let httpApiUrlInterceptor;

    beforeEach(() => {
        httpApiUrlInterceptor = new HttpApiUrlInterceptor();
    });

    it(`should have '/api' prefix url`, () => {
        expect(httpApiUrlInterceptor.apiUrl).toEqual('/api');
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

            expect(httpApiUrlInterceptor.response(respond)).toEqual(respond.data);
        });

        it(`should return 'response' object`, () => {
            const respond = {
                config: {
                    headers: {}
                }
            };

            expect(httpApiUrlInterceptor.response(respond)).toEqual(respond);
        });
    });

    describe('request()', () => {
        it(`should not prepend api url for none API request`, () => {
            let config = {
                url: 'test.html',
                headers: {}
            };

            let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
            expect(respondConfig.url).toEqual(config.url);
            expect(respondConfig.headers['Accept']).toBeUndefined();
            expect(respondConfig.headers['Content-Type']).toBeUndefined();
        });

        it(`should prepend api url for API request`, () => {
            let config = {
                url: '/test',
                headers: {}
            };

            let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
            expect(respondConfig.url).toEqual(httpApiUrlInterceptor.apiUrl + config.url);
        });

        it(`should set Accept and Content-Type headers for POST request`, () => {
            let config = {
                url: '/test',
                method: 'POST',
                headers: {}
            };

            let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
            expect(respondConfig.headers['Accept']).toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toEqual(HEADER_API_VERSION);
        });

        it(`should set Accept and Content-Type headers for PUT request`, () => {
            let config = {
                url: '/test',
                method: 'PUT',
                headers: {}
            };

            let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
            expect(respondConfig.headers['Accept']).toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toEqual(HEADER_API_VERSION);
        });

        it(`should set Accept and Content-Type headers for GET request`, () => {
            let config = {
                url: '/test',
                method: 'GET',
                headers: {}
            };

            let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
            expect(respondConfig.headers['Accept']).toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toEqual(HEADER_API_VERSION);
        });

        //fit(`should not set Content-Type headers for GET request`, () => {
        //    let config = {
        //        url: '/test',
        //        method: 'GET',
        //        headers: {}
        //    };
        //
        //    let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
        //    expect(respondConfig.headers['Accept']).toEqual(HEADER_API_VERSION);
        //    expect(respondConfig.headers['Content-Type']).toBeUndefined();
        //});

        it(`should prepend api url for API request if apiUrl is undefined`, () => {
            let config = {
                url: '/test',
                headers: {}
            };

            httpApiUrlInterceptor.apiUrl = '';
            let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
            expect(respondConfig.url).toEqual(config.url);
            expect(respondConfig.headers['Accept']).not.toEqual(HEADER_API_VERSION);
            expect(respondConfig.headers['Content-Type']).toBeUndefined();
        });

        it(`should set empty data for GET request`, () => {
            let config = {
                url: '/test',
                method: 'GET',
                headers: {}
            };

            let respondConfig = httpApiUrlInterceptor.request(Object.assign({}, config));
            expect(respondConfig.data).toEqual('');
        });
    });
});
