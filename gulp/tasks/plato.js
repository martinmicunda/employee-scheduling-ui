/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import plato from 'plato';
import path from '../paths';

// TODO: Plato doesn't support ES6 yet see open issue here https://github.com/es-analysis/plato/issues/127
gulp.task('plato', (cb) => {
    const options = {
        jshint: {
            options: {
                strict: true
            }
        },
        complexity: {
            trycatch: true
        }
    };
    plato.inspect(path.app.scripts.concat('!' + path.test.mock), path.test.platoReports, options, cb);
});
