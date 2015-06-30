/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import filter from 'gulp-filter';
import changed from 'gulp-changed';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import path from '../paths';

const argv = util.env;
const LOG = util.log;
const ENV = !!argv.env ? argv.env : 'DEV';
const COLORS = util.colors;

if(!ENV.match(new RegExp(/prod|dev|test|DEV|TEST|PROD/))) {
    LOG(COLORS.red(`Error: The argument 'env' has incorrect value ${ENV}! Usage: --env=(DEV|TEST|PROD)`));
    process.exit(1);
}

/**
 * Compile SASS files into the main.css.
 *
 * @return {Stream}
 */
gulp.task('sass', () => {
    // if it's set to `true` the gulp.watch will keep gulp from stopping
    // every time we mess up sass files
    const errLogToConsole = ENV === 'dev' || ENV === 'DEV'|| ENV === 'test'|| ENV === 'TEST';

    return gulp.src(path.app.styles)
        .pipe(changed(path.tmp.styles, {extension: '.scss'}))
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'compressed', errLogToConsole: errLogToConsole}))
        .pipe(autoprefixer('last 2 version'))
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(path.tmp.styles))
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});
