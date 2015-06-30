/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import path from '../paths';

/**
 * The 'watch' task set up the checks to see if any of the files listed below
 * change, and then to execute the listed tasks when they do.
 */
gulp.task('watch', () => {
    // Watch images and fonts files
    gulp.watch([path.app.images, path.app.fonts], [browserSync.reload]);

    // Watch css files
    gulp.watch(path.app.styles, ['sass']);

    // Watch js files
    gulp.watch([path.app.scripts, path.gulpfile], ['jshint', browserSync.reload]);

    // Watch html files
    gulp.watch([path.app.html, path.app.templates], ['htmlhint', browserSync.reload]);
});
