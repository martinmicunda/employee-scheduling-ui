/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 *
 * !!! DO NOT MAKE ANY CHANGES TO THIS FILE!!!
 * The env conditions are injected automatically each time you run `npm start`. (see gulp/tasks/server.js file)
 */
'use strict';

/* inject:env */
export var mock = true;
export var optimize = true;
export var environment = 'test';
/* endinject */

console.log('mock: ' + mock);
console.log('optimize: ' + optimize);
console.log('environment: ' + environment);
