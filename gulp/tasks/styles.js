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
const ENV = !!argv.env ? argv.env.toLowerCase() : 'DEV';

/**
 * Compile SASS files into the main.css.
 *
 * @return {Stream}
 */
gulp.task('sass', () => {
    // if it's set to `true` the gulp.watch will keep gulp from stopping
    // every time we mess up sass files
    const errLogToConsole = ENV === 'dev' || ENV === 'test';

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
