/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import del from 'del';
import gulp from 'gulp';
import util from 'gulp-util';
import {server as karma} from 'karma';
import istanbulEnforcer from 'gulp-istanbul-enforcer';
import path from '../paths';
import {COVERAGE} from '../const';

const LOG = util.log;
const COLORS = util.colors;
const argv = util.env;
const BROWSERS = !!argv.browsers ? argv.browsers : 'PhantomJS';

//=============================================
//         COMMAND LINE ERROR HANDLING
//=============================================

if(!BROWSERS.match(new RegExp(/PhantomJS|Chrome|Firefox|Safari/))) {
    LOG(COLORS.red(`Error: The argument 'browsers' has incorrect value ${BROWSERS}! Usage: --browsers=(PhantomJS|Chrome|Firefox|Safari)`));
    process.exit(1);
}

//=============================================
//                 TASKS
//=============================================

// check this http://slides.com/jesseharlin/unfreeze-your-brain#/31
/**
 * The 'karma' task run unit tests without coverage check.
 *
 * @param {Function} done - callback when complete
 */
//TODO: (martin) should I merge this with `gulp test:unit` task and then just pass argument --coverage (it will run unit test with coverage e.g. gulp test:unit --coverage)
gulp.task('karma', (cb) => {
    // remove 'coverage' directory before each test
    del.sync(path.test.testReports.coverage);
    // run the karma test
    karma.start({
        configFile: path.test.config.karma,
        browsers: [BROWSERS],
        singleRun: !argv.watch,
        autoWatch: !!argv.watch
    }, function(code) {
        // make sure failed karma tests cause gulp to exit non-zero
        if(code === 1) {
            LOG(COLORS.red('Error: unit test failed '));
            return process.exit(1);
        }
        cb();
    });
});

/**
 * The 'test:unit' task run unit tests with coverage check.
 *
 * @return {Stream}
 */
gulp.task('test:unit', ['karma'], () => {
    var options = {
        thresholds : COVERAGE,
        coverageDirectory: path.test.testReports.coverage,
        rootDirectory : path.test.testReports.basePath // keep root `test-reports/` so enforce plugin is not searching in other directories
    };
    return gulp.src('.')
        .pipe(istanbulEnforcer(options))
        .on('error', function(error) {
            LOG(error.toString());
            return process.exit(1);
        });
});
