/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import del from 'del';
import rev from 'gulp-rev';
import gulp from 'gulp';
import util from 'gulp-util';
import size from 'gulp-size';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import usemin from 'gulp-usemin';
import inject from 'gulp-inject';
import header from 'gulp-header';
import cdnizer from 'gulp-cdnizer';
import bytediff from 'gulp-bytediff';
import minifyCss from 'gulp-minify-css';
import minifyHtml from 'gulp-minify-html';
import runSequence from 'run-sequence';
import path from '../paths';
import {BANNER, CDN_URL} from '../const';

//=============================================
//            UTILS FUNCTIONS
//=============================================
const LOG = util.log;
const COLORS = util.colors;
const HAS_CDN = !!util.env.cdn;

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted perentage
 */
function formatPercent(num, precision){
    return (num * 100).toFixed(precision);
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    const difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return COLORS.yellow(data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' +
        (data.endSize / 1000).toFixed(2) + ' kB and is ' +
        formatPercent(1 - data.percent, 2) + '%' + difference);
}

//=============================================
//                  TASKS
//=============================================
/**
 * The 'clean' task delete 'build' and '.tmp' directories.
 *
 * @param {Function} done - callback when complete
 */
gulp.task('clean', (cb) => {
    const files = [].concat(path.build.basePath, path.tmp.basePath);
    LOG('Cleaning: ' + COLORS.blue(files));

    return del(files, cb);
});

/**
 * The 'copy' task just copies files from A to B. We use it here
 * to copy our files that haven't been copied by other tasks
 * e.g. (favicon, etc.) into the `build/dist` directory.
 *
 * @return {Stream}
 */
gulp.task('extras', () => {
    return gulp.src([path.app.basePath + '*.{ico,png,txt}'])
        .pipe(gulp.dest(path.build.dist.basePath));
});

/**
 * The 'compile' task compile all js, css and html files.
 *
 * 1. it inject bundle into `index.html`
 * 2. css      - replace local path with CDN url, minify, add revision number, add banner header
 *    js       - annotates the sources before minifying, minify, add revision number, add banner header
 *    html     - replace local path with CDN url, minify
 *
 * @return {Stream}
 */
gulp.task('compile', ['htmlhint', 'sass', 'bundle'], () => {
    const projectHeader = header(BANNER);

    return gulp.src(path.app.html)
        .pipe(inject(gulp.src(path.tmp.scripts + 'build.js', {read: false}), {
            starttag: '<!-- inject:build:js -->',
            ignorePath: [path.app.basePath]
        }))
        .pipe(usemin({
            css:        [
                gulpif(HAS_CDN, cdnizer({defaultCDNBase: CDN_URL, relativeRoot: 'styles', files: ['**/*.{gif,png,jpg,jpeg}']})),
                bytediff.start(),
                minifyCss({keepSpecialComments: 0}),
                bytediff.stop(bytediffFormatter),
                rev(),
                projectHeader
            ],
            /*jshint camelcase: false */
            js:         [
                gulpif(HAS_CDN, cdnizer({defaultCDNBase: CDN_URL, relativeRoot: '/', files: ['**/*.{gif,png,jpg,jpeg}']})),
                bytediff.start(),
                uglify(),
                bytediff.stop(bytediffFormatter),
                rev(),
                projectHeader
            ],
            html:       [
                gulpif(HAS_CDN, cdnizer({defaultCDNBase: CDN_URL, files: ['**/*.{js,css,gif,png,jpg,jpeg}']})),
                bytediff.start(),
                minifyHtml({empty:true}),
                bytediff.stop(bytediffFormatter)
            ]
        }))
        .pipe(gulp.dest(path.build.dist.basePath))
        .pipe(size({title: 'compile', showFiles: true}));
});

/**
 * The 'build' task gets app ready for deployment by processing files
 * and put them into directory ready for production.
 *
 * @param {Function} done - callback when complete
 */
gulp.task('build', (cb) => {
    runSequence(
        ['clean'],
        ['compile', 'extras', 'images', 'fonts'],
        cb
    );
});
