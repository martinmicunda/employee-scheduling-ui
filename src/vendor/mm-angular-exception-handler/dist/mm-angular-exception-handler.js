/**
 * An angular module that override default $exceptionHandler service.
 * @version v0.0.1 - 2014-07-23
 * @link https://github.com/martinmicunda/mm-angular-exception-handler
 * @author Martin Micunda
 * @copyright 2014(c) Martin Micunda
 * @license MIT, https://github.com/martinmicunda/mm-angular-exception-handler/blob/master/LICENSE
 */
/* global Raven:true */
(function() {
    'use strict';

    /**
     * @ngdoc module
     * @name mm.exceptionHandler
     *
     * @description
     * The `mm.exceptionHandler` module override Angular's default {@link https://docs.angularjs.org/api/ng/service/$exceptionHandler `$exceptionHandler`}, it
     * preserves the default behaviour (logging to the console by {@link `mm.Logger`) but also posts the error to {@link https://getsentry.com/ `Sentry`)
     * or some custom reporting tool.
     *
     * # Usage
     * See {@link mm.exceptionHandler.$exceptionHandler#usage `$exceptionHandler`} for an example of configuring and using `$exceptionHandler`.
     *
     */

    /**
     * @ngdoc provider
     * @name $exceptionHandlerProvider
     * @module mm.exceptionHandler
     * @requires ng.$window
     * @requires ng.$injector
     * @requires mm.Logger
     *
     * @description
     * Use the `$exceptionHandlerProvider` to configure where to post errors. $exceptionHandlerProvider can posts error to `Sentry` or some custom reporting tool
     * see usage below.
     *
     * @usage
     * By default posting error to reporting tool is turn off. This can be turn on by configuring the `$exceptionHandlerProvider` like this (custom reporting tool):
     *
     * ```js
     *   angular.module('customExceptionHandlerDemo', []).config(['$exceptionHandlerProvider', function (cfg) {
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
     *   angular.module('sentryExceptionHandlerProviderDemo', []).config(['$exceptionHandlerProvider', function (cfg) {
     *      var ravenConfig = {logger: 'javascript'};
     *      cfg.setConfigAppErrorPrefix('demoApp');
     *      cfg.setConfigRavenDns(''https://7be...............491@app.getsentry.com/2...2');
     *      cfg.setConfigRavenConfig(ravenConfig);
     *   }]);
     * ```
     * > **Note:** You need to create Sentry account to be able to send error data to {@link https://getsentry.com/ `Sentry`).
     */
    function $exceptionHandlerProvider() {
        /**
         * @description
         * Exception handler configuration. appErrorPrefix is optional type. If you want to use error reporting tool then at
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

        this.$get = ['Logger', '$window', '$injector', function (Logger, $window, $injector) {
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
            return function (exception, cause) {
                var errorData = { exception: exception, cause: cause };
                var message = config.appErrorPrefix ? config.appErrorPrefix + ' - ' + exception.message : exception.message;

                try {
                    if ($window.Raven) {
                        // post error to Sentry
                        Raven.captureException(exception, {extra: {cause: cause, browserInfo: browserInfo}});
                    } else if(config.customDns) {
                        var errorMessage = exception ? exception.toString() : '';
                        var stackTrace = exception ? (exception.stack ? exception.stack.toString() : '') : '';

                        // using the $injector service directly to avoid a circular dependency
                        var $httpBackend = $injector.get('$httpBackend');

                        // bypassing angular's http abstraction to avoid infinite exception loops
                        $httpBackend('POST', config.customDns, angular.toJson({
                            url: $window.location.href,
                            message: errorMessage,
                            stackTrace: stackTrace,
                            cause: ( cause || ''),
                            browserInfo: browserInfo
                        }), angular.noop, { 'content-type': 'application/json' });
                    }
                } catch (loggingError){
                    logger.error('Error server-side logging failed');
                    logger.error(loggingError.toString());
                }
                // log the error to console
                logger.error(message, null, errorData);
            };
        }];
    }

    angular
        .module('mm.exceptionHandler', ['mm.logger'])
        .provider('$exceptionHandler', $exceptionHandlerProvider);
})();
