#!/usr/bin/env node

'use strict';
// !!!! READ THIS BLOG ABOUT NESTED PROMISES http://joshmock.github.io/boilerplate-free-promises-in-node/?utm_source=nodeweekly&utm_medium=email
console.log('#################################');
console.log('####      CI Build     ##########');
console.log('#################################');

var fs   = require('fs');
var exec = require('child_process').exec;
var BUILD_NUMBER, PULL_REQUEST, COMMIT, BRANCH;

function init() {
    // If we are on Travis CI, set our git credentials to make the travis commits look better
    if(process.env.TRAVIS) {
        console.log(process.env.TRAVIS);
        exec('git config --global user.name "Travis-CI"');
        exec('git config --global user.email "travis@travis-ci.org"');
        BUILD_NUMBER = process.env.TRAVIS_BUILD_NUMBER;
        PULL_REQUEST = process.env.TRAVIS_PULL_REQUEST;
        COMMIT = process.env.TRAVIS_COMMIT;
        BRANCH = process.env.TRAVIS_BRANCH;
    } else if(process.env.JENKINS_HOME) {
        BUILD_NUMBER = process.env.TRAVIS_BUILD_NUMBER;
        PULL_REQUEST = false;
        COMMIT = process.env.GIT_COMMIT;
        BRANCH = process.env.GIT_BRANCH;
    } else {
        // For testing if we aren't on CI
        BUILD_NUMBER = Math.floor((Math.random() * 100) + 1);
        PULL_REQUEST= false;
        COMMIT = exec('(git rev-parse HEAD)');
        BRANCH = 'origin/master';
    }

    console.log('BRANCH=' + BRANCH);
    console.log('BUILD_NUMBER=' + BUILD_NUMBER);
    console.log('PULL_REQUEST=' + PULL_REQUEST);
    console.log('COMMIT=' + COMMIT);
}

var installDependencies = function(callback) {

    console.log('Installing NPM packages...');

    var npm = exec('npm install', function(error) {
        if (error !== null) {
            console.error('Error installing NPM packages: ' + error);
            process.exit(1);
        } else {
            callback();
        }
    });

    npm.stdout.pipe(process.stdout);
    npm.stderr.pipe(process.stderr);

};

var gulpBuild = function(callback) {

    console.log('Build production app code...');

    var gulp = exec('gulp build --notest --nocdn', function(error) {
        if (error !== null) {
            console.error('Error build production app code: ' + error);
            process.exit(1);
        } else {
            callback();
        }
    });

    gulp.stdout.pipe(process.stdout);
    gulp.stderr.pipe(process.stderr);

};

var gulpTest = function(callback) {

    console.log('Running unit tests...');

    var gulp = exec('gulp test:unit', function(error) {
        if (error !== null) {
            console.error('Error running unit tests: ' + error);
            process.exit(1);
        } else {
            callback();
        }
    });

    gulp.stdout.pipe(process.stdout);
    gulp.stderr.pipe(process.stderr);

};

var checkForPullRequest = function(callback) {

    if(PULL_REQUEST != false) {
        console.log('This is a pull request build; will not push build out.');
        process.exit(0);
    } else {
        callback();
    }

};

function run() {
    init();

    installDependencies(function cb() {
        gulpBuild(function cb() {
            gulpTest(function cb() {
                checkForPullRequest(function cb() {
                    fs.mkdirSync('.tmp');
                    exec('git show ' + COMMIT + '~1:package.json > .tmp/package.old.json');

                });
            });
        });
    });

    console.log('Test yyyyyyyy');
}

run();

//var tasks = [];
//
//
//tasks.push(function install() {});
//tasks.push(function test() {});
//
//
//...
//
//
//
//
//for(var i = 0; i < tasks.length; i++) {
//    tasks[i]();
//}
