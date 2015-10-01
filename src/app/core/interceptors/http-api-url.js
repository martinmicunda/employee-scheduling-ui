/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {HEADER_API_VERSION} from '../constants/constants';
import {Service} from '../../ng-decorators'; // jshint unused: false

let self;
//start-non-standard
@Service({
    serviceName: 'HttpApiUrlInterceptor'
})
//end-non-standard
class HttpApiUrlInterceptor {
    constructor() {
        self = this; // http://stackoverflow.com/questions/28638600/angularjs-http-interceptor-class-es6-loses-binding-to-this
        this.apiUrl = '/api';
    }

    response(response) {
        // unwrap response.data for every successful request
        if(response.config.headers['Content-Type'] && response.config.headers['Content-Type'].includes(HEADER_API_VERSION)){
            return response.data;
        }

        return response;
    }

    shouldPrependApiUrl(reqConfig) {
        if (!this.apiUrl) {return false;}
        return !(/[\s\S]*.html/.test(reqConfig.url) || (reqConfig.url && reqConfig.url.includes(self.apiUrl)));
    }

    request(config) {
        // Filter out requests for .html templates, etc
        if (self.shouldPrependApiUrl(config)) {
            config.url = self.apiUrl + config.url;

            // add api version to header
            /*jshint -W069 */
            config.headers['Accept'] = HEADER_API_VERSION;
            if(config.method === 'POST' || config.method === 'PUT') {
                config.headers['Content-Type'] = HEADER_API_VERSION;
            }
        }

        return config;
    }
}

export default HttpApiUrlInterceptor;
