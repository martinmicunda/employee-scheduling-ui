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
@Inject('$q', '$injector')
//end-non-standard
class ApiUrlHttpInterceptor {
    constructor($q, $injector) {
        self = this; // http://stackoverflow.com/questions/28638600/angularjs-http-interceptor-class-es6-loses-binding-to-this
        this.apiUrl = '/api';
        this.$q = $q;
        this.$injector = $injector;
    }

    response(response) {
        // unwrap response.data for every successful request
        if(response.config.headers['Content-Type'] && response.config.headers['Content-Type'].includes(HEADER_API_VERSION)){
            return response.data;
        }

        return response;
    }

    responseError(rejection) {
        //http://jcrowther.io/2015/05/19/angular-js-http-interceptors/
        // retry request for 503 failure
        if (rejection.status !== 503) {return self.$q.reject(rejection);}
        if (rejection.config.retry) {
            rejection.config.retry++;
        } else {
            rejection.config.retry = 1;
        }

        if (rejection.config.retry < 5) {
            return self.$injector.get('$http')(rejection.config);
        } else {
            return self.$q.reject(rejection);
        }
    }

    shouldPrependApiUrl(reqConfig) {
        if (!this.apiUrl) {return false;}
        return !(/[\s\S]*.html/.test(reqConfig.url) || (reqConfig.url && reqConfig.url.includes(self.apiUrl)));
    }

    request(reqConfig) {
        // Filter out requests for .html templates, etc
        if (self.shouldPrependApiUrl(reqConfig)) {
            reqConfig.url = self.apiUrl + reqConfig.url;

            // add api version to header
            /*jshint -W069 */
            reqConfig.headers['Accept'] = HEADER_API_VERSION;
            reqConfig.headers['Content-Type'] = HEADER_API_VERSION;
        }

        return reqConfig;
    }
}

export default ApiUrlHttpInterceptor;
