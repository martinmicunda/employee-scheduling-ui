/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import size from 'gulp-size';
import flatten from 'gulp-flatten';
import path from '../paths';

/**
 * The 'fonts' task copies fonts to `build/dist` directory.
 *
 * @return {Stream}
 */
gulp.task('fonts', () => {
    return gulp.src(path.app.fonts)
        .pipe(flatten())
        .pipe(gulp.dest(path.build.dist.fonts))
        .pipe(size({title: 'fonts'}));
});
