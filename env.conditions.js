/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 *
 * !!! DO NOT MAKE ANY CHANGES TO THIS FILE!!!
 * The env conditions are injected automatically each time you run `npm start`. (see gulp/tasks/server.js file)
 */
'use strict';

window.ENV = {
    <!-- inject:env -->
    mock: false, optimize: false, environment: 'dev',
    <!-- endinject -->
};

System.set('ENV', System.newModule({ 'default': window.ENV, __useDefault: true })); // it requires for conditional ES6 module loader
