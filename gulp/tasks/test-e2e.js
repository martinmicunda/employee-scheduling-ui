/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import protractor from 'gulp-protractor';
import path from '../paths';
import {E2E_DEVELOPMENT_URL} from '../const'; //E2E_STAGING_URL

const LOG = util.log;
const COLORS = util.colors;
const argv = util.env;
//const ENV = !!argv.env ? argv.env : 'DEV';
const BROWSERS = !!argv.browsers ? argv.browsers : 'PhantomJS';

//=============================================
//         COMMAND LINE ERROR HANDLING
//=============================================

if(!BROWSERS.match(new RegExp(/IE|PhantomJS|Chrome|Firefox|Safari/))) {
    LOG(COLORS.red(`Error: The argument 'browsers' has incorrect value ${BROWSERS}! Usage: --browsers=(IE|PhantomJS|Chrome|Firefox|Safari)`));
    process.exit(1);
}

/**
 * The 'test:e2e' task run e2e tests.
 *
 * @return {Stream}
 */
/*jshint camelcase: false */
gulp.task('webdriver_update', false, protractor.webdriver_update); // update/install webdriver
gulp.task('test:e2e', ['webdriver_update'], () => {
    return gulp.src(path.test.e2e)
        .pipe(protractor.protractor({
            configFile: path.test.config.protractor,
            args: ['--baseUrl', E2E_DEVELOPMENT_URL, '--capabilities.browserName', BROWSERS.toLowerCase()] // protractor only accept lowercase browser name
        })).on('error', function () {
            LOG(COLORS.red('Error: E2E test failed'));
            // make sure failed tests cause gulp to exit non-zero
            return process.exit(1);
        });
});
