/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import inject from 'gulp-inject';
import httpProxy from 'http-proxy';
import modRewrite  from 'connect-modrewrite';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import path from '../paths';
import {API_URL} from '../const';

const argv = util.env;
const LOG = util.log;
const COLORS = util.colors;
const TEST_OPTIMIZE = 'test-optimize';

//=============================================
//         COMMAND LINE ERROR HANDLING
//=============================================

let ENV = !!argv.env ? argv.env : 'DEV';
let OPTIMIZE = !!argv.optimize ? argv.optimize : 'false';
let OPEN_BROWSER = !!argv.open ? argv.open : 'true';

if(!OPEN_BROWSER.match(new RegExp(/true|false|TRUE|FALSE/))) {
    LOG(COLORS.red(`Error: The argument 'open' has incorrect value ${OPEN_BROWSER}! Usage: --open=(true|false)`));
    process.exit(1);
} else {
    OPEN_BROWSER = OPEN_BROWSER === 'true' || OPEN_BROWSER === 'TRUE';
}

if(!OPTIMIZE.match(new RegExp(/true|false|TRUE|FALSE/))) {
    LOG(COLORS.red(`Error: The argument 'optimize' has incorrect value ${OPEN_BROWSER}! Usage: --optimize=(true|false)`));
    process.exit(1);
} else if(OPTIMIZE === 'true' || OPTIMIZE === 'TRUE') {
    ENV = TEST_OPTIMIZE;
}

if(!ENV.match(new RegExp(/prod|dev|test|DEV|TEST|PROD/))) {
    LOG(COLORS.red(`Error: The argument 'env' has incorrect value ${ENV}! Usage: --env=(DEV|TEST|PROD)`));
    process.exit(1);
}

//=============================================
//           PROXY CONFIGURATION
//=============================================

// This configuration allow you to configure browser sync to proxy your backend
const proxyTarget = API_URL; // The location of your backend API
const proxyApiPrefix = 'api/'; // The element in the URL which differentiate between API request and static file request

let proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

function proxyMiddleware(req, res, next) {
    if (req.url.includes(proxyApiPrefix)) {
        proxy.web(req, res);
    } else {
        next();
    }
}

function startBrowserSync(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;

    browserSync({
        files: files,
        open: OPEN_BROWSER,
        port: 8000,
        notify: false,
        server: {
            baseDir: baseDir,
            middleware: [
                proxyMiddleware,
                modRewrite(['!\\.\\w+$ /index.html [L]']) // require for HTML5 mode
            ]
        },
        browser: browser
    });
}


//=============================================
//                 TASKS
//=============================================

/**
 * The 'config' task is to configure environment by injecting
 * global env variable into the `index.html`.
 *
 * @return {Stream}
 */
gulp.task('config', () => {
    const optimize = OPTIMIZE === 'true';
    const env = ENV === TEST_OPTIMIZE ? 'test' : ENV;
    return gulp.src(path.app.html)
        .pipe(inject(gulp.src('.'), {
            starttag: '<!-- inject:env -->',
            transform: () => `mock: ${ENV.toLowerCase() === 'test' || OPTIMIZE === 'true'}, optimize: ${optimize}, environment: '${env.toLowerCase()}'`
        }))
        .pipe(gulp.dest(path.app.basePath));
});

/**
 * The 'startBrowserSync' task start BrowserSync and open the browser.
 */
gulp.task('startBrowserSync', () => {
    let startBrowserSyncTask;

    switch(ENV) {
        case 'DEV':
        case 'dev':
        case 'TEST':
        case 'test':
            startBrowserSyncTask = startBrowserSync(['.tmp', 'src', 'jspm_packages', './' ]);
            break;
        case 'PROD':
        case 'prod':
        case TEST_OPTIMIZE:
            startBrowserSyncTask = startBrowserSync([path.build.dist.basePath]);
            break;
    }

    return startBrowserSyncTask;
});

/**
 * The 'serve' task serve the dev, test and prod environment.
 */
gulp.task('serve', () => {
    let serveTasks;

    switch(ENV) {
        case 'DEV':
        case 'dev':
        case 'TEST':
        case 'test':
            serveTasks = ['config', 'sass', 'watch'];
            break;
        case 'PROD':
        case 'prod':
        case TEST_OPTIMIZE:
            serveTasks = ['config', 'build'];
            break;
    }

    // this will first run all serveTasks and then startBrowserSync task
    runSequence(
        serveTasks,
        ['startBrowserSync']
    );
});


