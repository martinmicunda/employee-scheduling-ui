/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import size from 'gulp-size';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import path from '../paths';

/**
 * The 'images' task optimize and copies images to `build/dist` directory.
 *
 * @return {Stream}
 */
gulp.task('images', () => {
    return gulp.src(path.app.images)
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(path.build.dist.images))
        .pipe(size({title: 'images'}));
});
