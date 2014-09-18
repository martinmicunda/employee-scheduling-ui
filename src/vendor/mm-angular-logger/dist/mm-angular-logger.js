/**
 * An AngularJS module that provides enhanced support for $log service.
 * @version v0.0.3 - 2014-07-23
 * @link https://github.com/martinmicunda/mm-angular-logger
 * @author Martin Micunda
 * @copyright 2014(c) Martin Micunda
 * @license MIT, https://github.com/martinmicunda/mm-angular-logger/blob/master/LICENSE
 */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name mm.logger
     *
     * @description
     * The `mm.logger` module provides enhanced support for Angular's {@link https://docs.angularjs.org/api/ng/service/$log `$log`} service.
     * This module adds more features for `$log` service like a timestamp, hint about where the message was created, turn off all
     * or specific kind of messages (like info() and debug()).
     *
     * # Example
     * See {@link mm.logger.Logger#example Logger} for an example of configuring and using `Logger`.
     *
     */

    /**
     * @ngdoc provider
     * @name LoggerProvider
     * @module mm.logger
     * @requires ng.$log
     * @requires LoggerUtils
     *
     * @description
     * Use the `LoggerProvider` to configure how the application logs messages.
     *
     * @usage
     * The default is to log all kind of messages. This can be disabled by configuring the `LoggerProvider` like this:
     *
     * ```js
     *   angular.module('loggerProviderDemo', []).config(['LoggerProvider', function (LoggerProvider) {
     *      LoggerProvider.disabled();
     *   }]);
     * ```
     *
     * or disable only certain kind of messages like this:
     *
     * ```js
     *   angular.module('loggerProviderDemo', []).config(['LoggerProvider', function (LoggerProvider) {
     *      LoggerProvider.disabled([LoggerProvider.level.INFO, LoggerProvider.level.DEBUG]);
     *   }]);
     * ```
     * > **Note:** There are 5 log levels at the moment:
     * - LoggerProvider.level.LOG
     * - LoggerProvider.level.INFO
     * - LoggerProvider.level.DEBUG
     * - LoggerProvider.level.WARN
     * - LoggerProvider.level.ERROR
     *
     * This logger support interpolate variables into the message string so these are valid logger implementations:
     *
     * ```js
     *   var logger = Logger.getLogger('LoggerExample'); // Name of the file / class / module
     *   logger.log('This is an log message.'); // "2014-07-18 15:53:22.831 [log] LoggerExample: This is an info message."
     *   logger.info('This is an info message with {0}', ['interpolate variable.']); // "2014-07-18 15:53:22.832 [info] LoggerExample: This is an info message with interpolate variable."
     *   logger.error('This is a {0} error! {1}', [ 'big', 'Just kidding!' ]); // "2014-07-18 15:53:22.833 [warn] LoggerExample: This is a big error! Just kidding!"
     * ```
     *
     * This logger is also working with exception that have a type of `Error`:
     *
     * ```js
     *   logger.error(msg, null, exception);
     * ```
     *
     * @example
         <example module="logExample">
             <file name="script.js">
                 angular.module('loggerExample', [mm.logger])
                 .controller('LoggerController', ['$scope', 'Logger', function($scope, Logger) {
                                    $scope.logger = Logger.getLogger('LoggerController');
                                    $scope.message = 'Hello World!';
                            }]);
             </file>
             <file name="index.html">
                 <div ng-controller="LoggerController">
                     <p>Reload this page with open console, enter text and hit the log button...</p>
                     Message:
                     <input type="text" ng-model="message"/>
                     <button ng-click="logger.log(message)">log</button>
                     <button ng-click="logger.warn(message)">warn</button>
                     <button ng-click="logger.info(message)">info</button>
                     <button ng-click="logger.error(message)">error</button>
                 </div>
             </file>
         </example>
     */
    function LoggerProvider() {
        /**
         * Flag to turn on/off logger
         * @private
         * @type {boolean}
         */
        var isEnabled = true;
        /**
         * Log levels
         * @private
         * @type {string[]}
         */
        var options = ['info', 'warn', 'debug', 'error'];

        /**
         * Log levels
         * @type {{INFO: string, WARN: string, DEBUG: string, ERROR: string}}
         */
        this.level = {
            LOG: 'log',
            INFO: 'info',
            WARN: 'warn',
            DEBUG: 'debug',
            ERROR: 'error'
        };
        /**
         * @ngdoc method
         * @name LoggerProvider#disabled
         *
         * @description
         * Disable all log messages or disable only certain kind of log messages.
         *
         * @param {string[]=} _options - an optional array of log level options
         */
        this.disabled = function (_options) {
            options = _options || options;
            isEnabled = false;
        };
        this.$get = ['$log', 'LoggerUtils', function ($log, LoggerUtils) {
            /**
             * @description
             * A Logger class
             *
             * @param {string} name - the logger name (name of the file, class or module)
             * @constructor
             */
            var Logger = function (name) {
                /**
                 * @type {string} - the logger name (name of the file, class or module)
                 * @default ''
                 */
                this.name = (name !== undefined) ? name : '';
            };

            Logger.prototype = {
                /**
                 * @ngdoc method
                 * @name Logger#_log
                 *
                 * @description Overwrite ng.$log messages
                 *
                 * @param {string} originalLogFn - $log function name
                 * @param {*} args - information like message, errors, interpolation object
                 * @private
                 */
                _log: function (originalLogFn, args) {
                    if (!isEnabled) {
                        if ((options.indexOf(originalLogFn) !== -1)) {
                            return;
                        }
                    }

                    var now = LoggerUtils.buildTimeString(new Date());
                    var message = '', supplantData = [], error = null;
                    switch (args.length) {
                        case 1:
                            message = LoggerUtils.supplant('{0} [{1}] {2}: {3}', [now, originalLogFn, this.name, args[0]]);
                            break;
                        case 2:
                            supplantData = args[1];
                            message = LoggerUtils.supplant('{0} [{1}] {2}: {3}', [now, originalLogFn, this.name, args[0]]);
                            break;
                        case 3:
                            error = args[2];
                            message = LoggerUtils.supplant('{0} [{1}] {2}: {3}', [now, originalLogFn, this.name, args[0]]);
                            break;
                    }
                    // if error is not null then pass error to $log service and let $log service to deal with it ($log service contains the code that can handle exceptions etc.)
                    if(error) {
                        $log[originalLogFn].call(null, LoggerUtils.supplant(message, supplantData), error);
                    } else {
                        $log[originalLogFn].call(null, LoggerUtils.supplant(message, supplantData));
                    }
                },
                /**
                 * @ngdoc method
                 * @name Logger#log
                 *
                 * @description
                 * Write a log message
                 */
                log: function () {
                    this._log('log', arguments);
                },
                /**
                 * @ngdoc method
                 * @name Logger#info
                 *
                 * @description
                 * Write a info message
                 */
                info: function () {
                    this._log('info', arguments);
                },
                /**
                 * @ngdoc method
                 * @name Logger#warn
                 *
                 * @description
                 * Write a warn message
                 */
                warn: function () {
                    this._log('warn', arguments);
                },
                /**
                 * @ngdoc method
                 * @name Logger#debug
                 *
                 * @description
                 * Write a debug message
                 */
                debug: function () {
                    this._log('debug', arguments);
                },
                /**
                 * @ngdoc method
                 * @name Logger#error
                 *
                 * @description
                 * Write a error message
                 */
                error: function () {
                    this._log('error', arguments);
                }
            };
            /**
             * @ngdoc method
             * @name Logger#getLogger
             *
             * @description
             * Return the new created logger instance.
             *
             * @param {string} name - the logger name (name of the file, class or module)
             * @returns {Logger} the new created Logger instance
             */
            Logger.getLogger = function (name) {
                return new Logger(name);
            };

            return Logger;
        }];
    }

    /**
     * @ngdoc service
     * @name LoggerUtils
     * @module mm.logger
     *
     * @description
     * Utilities for `Logger` like build date timestamp string, string supplant.
     */
    function LoggerUtils() {
        return {
            /**
             * @ngdoc method
             * @name LoggerUtils#buildTimeString
             * @description
             * DateTime utility that spits out UTC timestamp strings usually used in a reporting, print-capable process.
             * If the format argument is not pass then default format is `%Y-%M-%d %h:%m:%s.%z` e.g.: (2014-07-17 15:14:05.094).
             *
             * # Usage
             *
             * ```js
             *   angular.module('loggerUtilsBuildTimeStringDemo', []).config(['LoggerUtils', function (LoggerUtils) {
             *      var now = LoggerUtils.buildTimeString(new Date());
             *      console.log(now); // will print 2014-07-17 15:14:05.094
             *   }]);
             * ```
             *
             * @param {Date} date - the current date
             * @param {string=} format - the optional timestamp string format
             * @throws (String)
             * @returns {*} the new created date timestamp string
             */
            buildTimeString: function (date, format) {
                format = format || '%Y-%M-%d %h:%m:%s.%z';

                function pad(value, isMilliSeconds) {
                    if (typeof (isMilliSeconds) === 'undefined') {
                        isMilliSeconds = false;
                    }

                    if (isMilliSeconds) {
                        if (value < 10) {
                            value = '00' + value;
                        } else if (value < 100) {
                            value = '0' + value;
                        }
                    }
                    return(value.toString().length < 2) ? '0' + value : value;
                }

                return format.replace(/%([a-zA-Z])/g, function (_, fmtCode) {
                    switch (fmtCode) {
                        case 'Y':
                            return date.getFullYear();
                        case 'M':
                            return pad(date.getMonth() + 1);
                        case 'd':
                            return pad(date.getDate());
                        case 'h':
                            return pad(date.getHours());
                        case 'm':
                            return pad(date.getMinutes());
                        case 's':
                            return pad(date.getSeconds());
                        case 'z':
                            return pad(date.getMilliseconds(), true);
                        default:
                            throw new Error('Unsupported format code: ' + fmtCode);
                    }
                });
            },
            /**
             * @ngdoc method
             * @name LoggerUtils#supplant
             * @description
             * String supplant utility (similar to but more powerful than sprintf()). Does variable substitution on the string.
             * It scans through the string looking for expressions enclosed in { } braces. If an expression is found, use it
             * as a key on the object, and if the key has a string value or number value, it is substituted for the bracket
             * expression and it repeats.
             * @see http://javascript.crockford.com/remedial.html
             *
             * # Usage
             *
             * ```js
             *   angular.module('loggerUtilsSupplantDemo', []).config(['LoggerUtils', function (LoggerUtils) {
             *      var message = LoggerUtils.supplant('{0} [{1}] {2}: {3}', [ LoggerUtils.buildTimeString(new Date()), 'info', 'SearchCtrl', 'This is a info message.' ])
             *      console.log(message); // will print 2014-07-17 15:14:05.094 [info] SearchCtrl: This is a info message.
             *   }]);
             * ```
             *
             * @param {template} template - the expressions enclosed in { } braces
             * @param {values[]} values - the array of string param that should be substituted
             * @param {pattern=} pattern - the regex pattern
             * @returns {*} the variable substitution on the string
             */
            supplant: function (template, values, pattern) {
                pattern = pattern || /\{([^\{\}]*)\}/g;

                return template.replace(pattern, function (a, b) {
                    var p = b.split('.'),
                        r = values;

                    try {
                        for (var s in p) {
                            r = r[p[s]];
                        }
                    } catch (e) {
                        r = a;
                    }

                    return (typeof r === 'string' || typeof r === 'number') ? r : a;
                });
            }
        };
    }

    angular
        .module('mm.logger', [])
        .provider('Logger', LoggerProvider)
        .factory('LoggerUtils', LoggerUtils);
})();
