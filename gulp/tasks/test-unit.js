'use strict';

import del from 'del';
import gulp from 'gulp';
import util from 'gulp-util';
import gulpif from 'gulp-if';
import {Server} from 'karma';
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

if(!BROWSERS.match(new RegExp(/IE|PhantomJS|Chrome|Firefox|Safari/))) {
    LOG(COLORS.red(`Error: The argument 'browsers' has incorrect value ${BROWSERS}! Usage: --browsers=(IE|PhantomJS|Chrome|Firefox|Safari)`));
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
gulp.task('karma', (cb) => {
    // remove 'coverage' directory before each test
    del.sync(path.test.testReports.coverage);
    // run the karma test
    const server = new Server({
        configFile: path.test.config.karma,
        browsers: BROWSERS.split(','),
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
    server.start();
});

/**
 * The 'test:unit' task run unit tests with coverage check.
 *
 * @return {Stream}
 */
gulp.task('test:unit', ['karma'], () => {
    const noCoverage = !!argv.nocoverage;
    const options = {
        thresholds : COVERAGE,
        coverageDirectory: path.test.testReports.coverage,
        rootDirectory : path.test.testReports.basePath // keep root `test-reports/` so enforce plugin is not searching in other directories
    };
    return gulp.src('.')
        .pipe(gulpif(!noCoverage, istanbulEnforcer(options)))
        .on('error', function(error) {
            LOG(error.toString());
            return process.exit(1);
        });
});
