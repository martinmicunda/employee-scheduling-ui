/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {HEADER_API_VERSION} from '../constants/constants';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

let self;
//start-non-standard
@Service({
    serviceName: 'ApiUrlHttpInterceptor'
})
@Inject('$q')
//end-non-standard
class ApiUrlHttpInterceptor {
    constructor($q) {
        self = this; // http://stackoverflow.com/questions/28638600/angularjs-http-interceptor-class-es6-loses-binding-to-this
        this.apiUrl = '/api';
        this.$q = $q;
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

    request(reqConfig) {
        // Filter out requests for .html templates, etc
        if (self.apiUrl && self.shouldPrependApiUrl(reqConfig)) {
            reqConfig.url = self.apiUrl + reqConfig.url;
        }

        // add api version to header
        /*jshint -W069 */
        reqConfig.headers['Accept'] = HEADER_API_VERSION;
        reqConfig.headers['Content-Type'] = HEADER_API_VERSION;
        return reqConfig;
    }
}
