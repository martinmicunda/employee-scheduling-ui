/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import fs from 'fs';
import pkg from '../../package.json';
import gulp from 'gulp';
import util from 'gulp-util';
import bump from 'gulp-bump';
import semver from 'semver';
import changelog from 'conventional-changelog';

const argv = util.env;
const LOG = util.log;
const COLORS = util.colors;

/**
 * The 'bump' task bump version number in package.json.
 *
 * @return {Stream}
 */
gulp.task('bump', ['jshint', 'htmlhint', 'test:unit'], () => {
    const HAS_REQUIRED_ATTRIBUTE = !!argv.type ? !!argv.type.match(new RegExp(/major|minor|patch/)) : false;

    if (!HAS_REQUIRED_ATTRIBUTE) {
        LOG(COLORS.red('Error: Required bump \'type\' is missing! Usage: gulp bump --type=(major|minor|patch)'));
        return process.exit(1);
    }

    if (!semver.valid(pkg.version)) {
        LOG(COLORS.red('Error: Invalid version number - ' + pkg.version));
        return process.exit(1);
    }

    return gulp.src(['package.json'])
        .pipe(bump({type: argv.type}))
        .pipe(gulp.dest('./'));
});

/**
 * The 'changelog' task generate changelog.
 */
gulp.task('changelog', (cb) => {
    changelog({
        version: pkg.version
    }, function(err, data) {
        if (err) {
            LOG(COLORS.red('Error: Failed to generate changelog ' + err));
            return process.exit(1);
        }
        fs.writeFileSync('CHANGELOG.md', data, cb());
    });
});

/**
 * The 'release' task push package.json and CHANGELOG.md to GitHub.
 */
gulp.task('release', (cb) => {
    const exec = require('child_process').exec;

    if(!semver.valid(pkg.version)) {
        LOG(COLORS.red(`Error: Invalid version number - ${pkg.version}. Please fix the the version number in package.json and run 'gulp publish' command again.`));
        return process.exit(1);
    }

    exec('git status --porcelain', function (err, stdout) {
        if (err) {return cb(err);}
        if (stdout === '') {
            return cb(new Error('No changes detected in this repo. Aborting release.'));
        }

        LOG(COLORS.blue('Pushing to GitHub ...'));
        var commitMsg = `chore(release): v${pkg.version}`;

        exec('git add CHANGELOG.md package.json', childProcessCompleted);
        exec('git commit -m "' + commitMsg + '" --no-verify', childProcessCompleted);
        exec('git push origin master', childProcessCompleted);

        cb();
    });

    function childProcessCompleted(error, stdout, stderr) {
        LOG('stdout: ' + stdout);
        LOG('stderr: ' + stderr);
        if (error !== null) {
            return cb(error);
        }
    }
});
