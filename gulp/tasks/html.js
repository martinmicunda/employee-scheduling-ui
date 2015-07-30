/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import htmlhint from 'gulp-htmlhint';
import path from '../paths';

/**
 * The 'htmlhint' task defines the rules of our hinter as well as which files we
 * should check. It helps to detect errors and potential problems in our
 * HTML code.
 *
 * @return {Stream}
 */
gulp.task('htmlhint', () => {
    return gulp.src([path.app.html, path.app.templates])
        .pipe(htmlhint('.htmlhintrc'))
        .pipe(htmlhint.reporter())
        .pipe(htmlhint.failReporter());
});
