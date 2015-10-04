/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import util from 'gulp-util';
import gulp from 'gulp';
import jshint from 'gulp-jshint';
import gulpif from 'gulp-if';
import cdnizer from 'gulp-cdnizer';
import preprocess from 'gulp-preprocess';
import path from '../paths';
import {CDN_URL} from '../const';

const HAS_CDN = !!util.env.cdn;

/**
 * The 'jshint' task defines the rules of our hinter as well as which files
 * we should check. It helps to detect errors and potential problems in our
 * JavaScript code.
 *
 * @return {Stream}
 */
gulp.task('jshint', () => {
    return gulp.src(path.app.scripts.concat(path.gulpfile))
        .pipe(jshint(`${path.root}/.jshintrc`))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('html-preprocess', () => {
    return gulp.src(path.app.templates)
        .pipe(gulpif(HAS_CDN, cdnizer({defaultCDNBase: CDN_URL, relativeRoot: '/', files: ['**/*.{gif,png,jpg,jpeg}'], matchers: [/(<img\s.*?data-src=["'])(.+?)(["'].*?>)/gi]})))
        .pipe(gulp.dest(path.tmp.scripts + 'app'));
});

// TODO: (martin) remove this task once problem with conditional import for systemjs-builder will be fixed
gulp.task('js-preprocess', ['html-preprocess'], () => {
    const argv = util.env;
    const env = !!argv.env ? argv.env : 'DEV';
    const CONFIG = `import './config.${env.toLowerCase()}';`;
    function mockPath(path) {
        return env === 'TEST' || env === 'test' ? `import '${path}';` : '';
    }
    return gulp.src(path.app.scripts.concat(path.app.templates, path.app.json))
        .pipe(preprocess({context: {env, CONFIG, mockPath}}))
        .pipe(gulp.dest(path.tmp.scripts + 'app'));
});

/**
 * Create JS production bundle.
 *
 * @param {Function} done - callback when complete
 */
gulp.task('bundle', ['jshint', 'js-preprocess'], (cb) => {
    const Builder = require('systemjs-builder');
    const builder = new Builder();
    const inputPath = '.tmp/scripts/app/app'; // TODO: (martin) replace this path with 'src/app/app' once problem with conditional import for systemjs-builder will be fixed
    const outputFile = `${path.tmp.scripts}build.js`;
    const outputOptions = { sourceMaps: true, config: {sourceRoot: path.tmp.scripts} };

    builder.loadConfig(`${path.root}/jspm.conf.js`)
        .then(() => {
            builder.buildStatic(inputPath, outputFile, outputOptions)
                .then(() => cb())
                .catch((ex) => cb(new Error(ex)));
        });
});
