/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

let self;
//start-non-standard
@Service({
    serviceName: 'HttpAuthenticationInterceptor'
})
@Inject('$location', '$injector')
//end-non-standard
class HttpAuthenticationInterceptor {
    constructor($location, $injector) {
        self = this; // http://stackoverflow.com/questions/28638600/angularjs-http-interceptor-class-es6-loses-binding-to-this
        this.$location = $location;
        this.$injector = $injector;
    }

    responseError(rejection) {
        switch (rejection.status) {
            case 401:
                // injected manually to get around circular dependency problem
                const TokenModel = self.$injector.get('TokenModel');
                TokenModel.remove();
                self.$location.path('/');
                break;
            case 403:
                self.$location.path('/403');
                break;
        }

        return Promise.reject(rejection);
    }

    request(config) {
        // injected manually to get around circular dependency problem
        const TokenModel = self.$injector.get('TokenModel');
        const token = TokenModel.get();
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
    }
}

export default HttpAuthenticationInterceptor;
