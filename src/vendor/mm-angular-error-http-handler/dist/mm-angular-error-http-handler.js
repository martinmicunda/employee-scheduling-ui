/**
 * An angular module that handle $http request error.
 * @version v0.0.1 - 2014-07-24
 * @link https://github.com/martinmicunda/mm-angular-error-http-handler
 * @author Martin Micunda
 * @copyright 2014(c) Martin Micunda
 * @license MIT, https://github.com/martinmicunda/mm-angular-error-http-handler/blob/master/LICENSE
 */
/* global Raven:true */
(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name mm.errorHttpHandler
     *
     * @description
     * The `mm.errorHttpHandler` module checks if any $http request has failed and if so automatically posts the error to {@link https://getsentry.com/ `Sentry`)
     * or some custom reporting tool. For any http error you will be redirect to follow pages:
     *
     * - 404 error status -> /404
     * - 0 error status   -> /500
     * - any other error  -> /500
     * > **Note:** It's up to you how you gonna handle route in your application and implement UI templates for each error.
     *
     * # Usage
     * See {@link mm.errorHttpHandler.errorHttpHandler#usage `errorHttpHandler`} for an example of configuring and using `errorHttpHandler`.
     *
     */

    /**
     * @ngdoc provider
     * @name errorHttpHandlerProvider
     * @module mm.errorHttpHandler
     * @requires ng.$window
     * @requires ng.$injector
     * @requires ng.$q
     * @requires ng.$location
     * @requires mm.Logger
     *
     * @description
     * Use the `errorHttpHandlerProvider` to configure where to post errors. errorHttpHandlerProvider can posts error to `Sentry` or some custom reporting tool
     * see usage below.
     *
     * @usage
     * By default posting error to reporting tool is turn off. This can be turn on by configuring the `errorHttpHandlerProvider` like this (custom reporting tool):
     *
     * ```js
     *   angular.module('customErrorHttpHandlerDemo', []).config(['errorHttpHandlerProvider', function (cfg) {
     *      cfg.setConfigAppErrorPrefix('demoApp');
     *      cfg.setConfigCustomDns('http://localhost:3000/error');
     *   }]);
     * ```
     * > **Note:** You need to provide your own back end implementation that accept `post` json request.
     *
     * or post error to `Sentry` like this:
     *
     * ```html
     * <script src="//cdn.ravenjs.com/1.1.15/raven.min.js"></script>
     * ```
     * ```js
     *   angular.module('sentryErrorHttpHandlerDemo', []).config(['errorHttpHandlerProvider', function (cfg) {
     *      var ravenConfig = {logger: 'javascript'};
     *      cfg.setConfigAppErrorPrefix('demoApp');
     *      cfg.setConfigRavenDns('https://7be...............491@app.getsentry.com/2...2');
     *      cfg.setConfigRavenConfig(ravenConfig);
     *   }]);
     * ```
     * > **Note:** You need to create Sentry account to be able to send error data to {@link https://getsentry.com/ `Sentry`).
     */
    function errorHttpHandlerProvider() {
        /*jshint validthis: true */
        /**
         * @description
         * Error http handler configuration. appErrorPrefix is optional type. If you want to use error reporting tool then at
         * least one of the `ravenDns` or `customDns` has to be defined.
         *
         * @private
         * @type {{appErrorPrefix: string, ravenDns: null, ravenConfig: null, customDns: null}}
         */
        var config = {
            appErrorPrefix: '', // optional
            ravenDns: null,
            ravenConfig: null, // optional
            customDns: null
        };
        /**
         * @ngdoc method
         * @name $exceptionHandlerProvider#setConfigAppErrorPrefix
         *
         * @description
         * Set app error prefix.
         *
         * @param {string=} _appErrorPrefix - an optional app error prefix
         */
        this.setConfigAppErrorPrefix = function(_appErrorPrefix) {
            config.appErrorPrefix = _appErrorPrefix || config.appErrorPrefix;
        };
        /**
         * @ngdoc method
         * @name $exceptionHandlerProvider#setConfigAppErrorPrefix
         *
         * @description
         * Set the raven DNS.
         *
         * @param {string} _ravenDns - an valid raven DNS
         */
        this.setConfigRavenDns = function(_ravenDns) {
            if (!_ravenDns) {
                throw new Error('RavenDNS must be set!');
            }
            config.ravenDns = _ravenDns;
        };
        /**
         * @ngdoc method
         * @name $exceptionHandlerProvider#setConfigRavenConfig
         *
         * @description
         * Set the raven config options.
         *
         * @param {string[]=} _ravenConfig - an optional array of raven config options
         */
        this.setConfigRavenConfig = function(_ravenConfig) {
            config.ravenConfig = _ravenConfig || config.ravenConfig;
        };
        /**
         * @ngdoc method
         * @name $exceptionHandlerProvider#setConfigCustomDns
         *
         * @description
         * Set the custom dns.
         *
         * @param {string} _customDns - an valid custom DNS
         */
        this.setConfigCustomDns = function(_customDns) {
            if (!_customDns) {
                throw new Error('CustomeDNS must be set!');
            }
            config.customDns = _customDns;
        };

        this.$get = ['$injector', '$q', '$location', '$window', 'Logger', function ($injector, $q, $location, $window, Logger) {
            var logger = Logger.getLogger('$exceptionHandler');

            var browserInfo = {
                navigatorAppName : navigator.appName,
                navigatorUserAgent : navigator.userAgent
            };
            if ($window.Raven) {
                logger.info('Using the RavenJS server-side logging exception handler.');
                logger.info('RavenJS ravenDns {0}', [config.ravenDns]);
                logger.info('RavenJS ravenConfig {0}', [config.ravenConfig]);
                try {
                    // configure Raven
                    Raven.config(config.ravenDns, config.ravenConfig).install();
                } catch (loggingError) {
                    logger.error('Error to configure RavenJS');
                    logger.error(loggingError.toString());
                }
            } else if(config.customDns) {
                logger.info('Using the custom server-side logging exception handler.');
                logger.info('Custom DNS {0}', [config.customDns]);
            }

            return {
                responseError: function (rejection) {
                    try {
                        if ($window.Raven) {
                            // post error to Sentry
                            Raven.captureException(new Error('HTTP response error'), {extra: {
                                method: rejection.config.method,
                                url: rejection.config.url,
                                message: rejection.data,
                                status: rejection.status,
                                browserInfo: browserInfo}
                            });
                        } else if(config.customDns) {
                            // using the $injector service directly to avoid a circular dependency
                            var $httpBackend = $injector.get('$httpBackend');

                            // bypassing angular's http abstraction to avoid infinite exception loops
                            $httpBackend('POST', config.customDns, angular.toJson({
                                method: rejection.config.method,
                                url: rejection.config.url,
                                message: rejection.data,
                                status: rejection.status,
                                browserInfo: browserInfo
                            }), angular.noop, { 'content-type': 'application/json' });
                        }
                    } catch (loggingError){
                        logger.error('Error server-side logging failed');
                        logger.error(loggingError.toString());
                    }
                    switch (rejection.status) {
                        case 404:
                            $location.path('/404');
                            logger.error('{0} {1} \'{2}\'', [rejection.status, rejection.statusText, rejection.config.url]);
                            break;
                        case 0:
                            // TODO (martin): this error should be custom error page and not 500
                            $location.path('/500');
                            logger.error('{0} {1} {2} \'{3}\'', [rejection.status, rejection.statusText, rejection.config.url, 'Unable to communicate with the server. Make sure you are connected to the internet and try again.']);
                            break;
                        default:
                            $location.path('/500');
                            logger.error('{0} {1} {2} \'{3}\'', [rejection.status, rejection.statusText, rejection.config.url, rejection.data.message]);
                            break;
                    }
                    return $q.reject(rejection);
                }
            };
        }];
    }

    angular
        .module('mm.errorHttpHandler', ['mm.logger'])
        .provider('errorHttpHandler', errorHttpHandlerProvider)
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('errorHttpHandler');
        });
})();
