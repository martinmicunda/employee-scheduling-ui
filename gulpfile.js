/*jshint camelcase: false */
'use strict';

//=============================================
//               DEPENDENCIES
//=============================================

/**
 * Load required dependencies.
 */
var fs             = require('fs');
var pkg            = require('./package.json');
var del            = require('del');
var path           = require('path');
var gulp           = require('gulp');
var plato          = require('plato');
var karma          = require('karma').server;
var moment         = require('moment');
var semver         = require('semver');
var httpProxy      = require('http-proxy');
var changelog      = require('conventional-changelog');
var modRewrite     = require('connect-modrewrite');
var runSequence    = require('run-sequence');
var browserSync    = require('browser-sync');

/**
 * Load Gulp plugins listed in 'package.json' and attaches
 * them to the `$` variable.
 */
/*jshint -W079 */
var $ = require('gulp-load-plugins')();


//=============================================
//   !!!FEEL FREE TO EDIT THESE VARIABLES!!!
//=============================================

var PRODUCTION_URL       = 'http://your-production-url.com';
var DEVELOPMENT_URL      = 'http://127.0.0.1:3000';
var PRODUCTION_CDN_URL   = 'http://martinmicunda.github.io/employee-scheduling-ui/dist/';

//=============================================
//            DECLARE VARIABLES
//=============================================

/**
 * Declare variables that are use in gulpfile.js or angular app
 */
var log                  = $.util.log;
var argv                 = $.util.env;
var ENV                  = !!argv.env ? argv.env : 'dev';
var COLORS               = $.util.colors;
var BROWSERS             = !!argv.browsers ? argv.browsers : 'PhantomJS';
var CDN_BASE             = !!argv.cdn ? PRODUCTION_CDN_URL : DEVELOPMENT_URL;
var APPLICATION_BASE_URL = ENV ? PRODUCTION_URL : DEVELOPMENT_URL;


//=============================================
//         COMMAND LINE ERROR HANDLING
//=============================================

if(!ENV.match(new RegExp(/prod|dev|test/))) {
    log(COLORS.red('Error: The argument \'env\' has incorrect value \'' + ENV +'\'! Usage: gulp test:e2e --env=(prod|dev|test)'));
    return process.exit(1);
}

if(!BROWSERS.match(new RegExp(/PhantomJS|Chrome|Firefox|Safari/))) {
    log(COLORS.red('Error: The argument \'browsers\' has incorrect value \'' + BROWSERS +'\'! Usage: gulp test:unit --browsers=(PhantomJS|Chrome|Firefox|Safari)'));
    return process.exit(1);
}


//=============================================
//            PRINT INFO MESSAGE
//=============================================
log(COLORS.blue('********** RUNNING IN ' + ENV + ' ENVIROMENT **********'));


//=============================================
//            UTILS FUNCTIONS
//=============================================

function formatPercent(num, precision){
    return (num*100).toFixed(precision);
}

function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return COLORS.yellow(data.fileName + ' went from ' +
    (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
    ' and is ' + formatPercent(1-data.percent, 2) + '%' + difference);
}

var proxyTarget = 'http://localhost:8000/';
var proxyApiPrefix = 'api';
var proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

var proxyMiddleware = function(req, res, next) {
    if (req.url.indexOf(proxyApiPrefix) !== -1) {
        proxy.web(req, res);
    } else {
        next();
    }
};
function startBrowserSync(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;

    browserSync({
        files: files,
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
//            DECLARE PATHS
//=============================================

var paths = {
    /**
     * The 'gulpfile' file is where our run tasks are hold.
     */
    gulpfile:   'gulpfile.js',
    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks.
     *
     * - 'styles'       contains all project css styles
     * - 'images'       contains all project images
     * - 'fonts'        contains all project fonts
     * - 'scripts'      contains all project javascript except config-env.js and unit test files
     * - 'html'         contains main html files
     * - 'templates'    contains all project html templates
     * - 'config'       contains Angular app config files
     */
    app: {
        basePath:       'src/',
        fonts:          ['src/fonts/**/*.{eot,svg,ttf,woff}', 'jspm_packages/**/*.{eot,svg,ttf,woff}'],
        styles:         'src/styles/**/*.scss',
        images:         'src/images/**/*.{png,gif,jpg,jpeg}',
        config: {
            dev:        'src/app/core/config/core.config.dev.js',
            test:       'src/app/core/config/core.config.test.js',
            prod:       'src/app/core/config/core.config.prod.js'
        },
        scripts:        ['src/app/**/*.js',
                         '!src/app/**/*.spec.js'
        ],
        html:           'src/index.html',
        templates:      'src/app/**/*.html'
    },
    /**
     * This is a collection of file patterns that refer to our app unit and e2e tests code.
     *
     * 'config'       contains karma and protractor config files
     * 'testReports'  contains unit and e2e test reports
     * 'unit'         contains all project unit test code
     * 'e2e'          contains all project e2e test code
     */
    test: {
        basePath:       'test/',
        config: {
            karma:      'test/config/karma.conf.js',
            protractor: 'test/config/protractor.conf.js'
        },
        testReports: {
            coverage:   'test/test-reports/coverage/'
        },
        platoReports:   'test/plato',
        mock:           'src/app/**/*.mock.js',
        unit:           'src/app/**/*.spec.js',
        e2e:            'test/e2e/**/*.e2e.js'
    },
    /**
     * The 'tmp' folder is where our html templates are compiled to JavaScript during
     * the build process and then they are concatenating with all other js files and
     * copy to 'dist' folder.
     */
    tmp: {
        basePath:       '.tmp/',
        styles:         '.tmp/styles/',
        scripts:        '.tmp/scripts/'
    },
    /**
     * The 'build' folder is where our app resides once it's
     * completely built.
     *
     * - 'dist'         application distribution source code
     * - 'docs'         application documentation
     */
    build: {
        basePath:       'build/',
        dist: {
            basePath:   'build/dist/',
            fonts:      'build/dist/fonts/',
            images:     'build/dist/images/',
            styles:     'build/dist/styles/',
            scripts:    'build/dist/scripts/'
        },
        docs:           'build/docs/'
    }
};


//=============================================
//            DECLARE BANNER DETAILS
//=============================================

/**
 * The banner is the comment that is placed at the top of our compiled
 * source files. It is first processed as a Gulp template, where the `<%=`
 * pairs are evaluated based on this very configuration object.
 */
var banner = $.util.template(
    '/**\n' +
    ' * <%= pkg.description %>\n' +
    ' * @version v<%= pkg.version %> - <%= today %>\n' +
    ' * @author <%= pkg.author.name %>\n' +
    ' * @copyright <%= year %>(c) <%= pkg.author.name %>\n' +
    ' * @license <%= pkg.license.type %>, <%= pkg.license.url %>\n' +
    ' */\n', {file: '', pkg: pkg, today: moment(new Date()).format('D/MM/YYYY'), year: new Date().toISOString().substr(0, 4)});


//=============================================
//                HELPER
//=============================================

/**
 * Add the ability to provide help text to custom gulp tasks. Usage: `gulp help`
 */
$.help(gulp);


//=============================================
//               SUB TASKS
//=============================================

/**
 * The 'clean' task delete 'build' and '.tmp' directories.
 */
gulp.task('clean', 'Delete \'build\' and \'.tmp\' directories', function (cb) {
    var files = [].concat(paths.build.basePath, paths.tmp.basePath);
    log('Cleaning: ' + COLORS.blue(files));

    return del(files, cb);
});

// TODO: Plato doesn't support ES6 yet see open issue here https://github.com/es-analysis/plato/issues/127
gulp.task('plato', function(cb) {
    var options = {
        jshint: {
            options: {
                strict: true
            }
        },
        complexity: {
            trycatch: true
        }
    };
    plato.inspect(paths.app.scripts.concat('!' + paths.test.mock), paths.test.platoReports, options, cb);
});

/**
 * The 'jshint' task defines the rules of our hinter as well as which files
 * we should check. It helps to detect errors and potential problems in our
 * JavaScript code.
 */
gulp.task('jshint', 'Hint JavaScripts files', function () {
    return gulp.src(paths.app.scripts.concat(paths.gulpfile))
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

/**
 * The 'htmlhint' task defines the rules of our hinter as well as which files we
 * should check. It helps to detect errors and potential problems in our
 * HTML code.
 */
gulp.task('htmlhint', 'Hint HTML files', function () {
    return gulp.src([paths.app.html, paths.app.templates])
        .pipe($.htmlhint('.htmlhintrc'))
        .pipe($.htmlhint.reporter())
        .pipe($.htmlhint.failReporter());
});

/**
 * Compile SASS files into the main.css.
 */
gulp.task('sass', 'Compile sass files into the main.css', function () {
    // if it's set to `true` the gulp.watch will keep gulp from stopping
    // every time we mess up sass files
    var errLogToConsole = ENV === 'dev' || ENV === 'test';
    return gulp.src(paths.app.styles)
        .pipe($.changed(paths.tmp.styles, {extension: '.scss'}))
        .pipe($.sourcemaps.init())
        .pipe($.sass({style: 'compressed', errLogToConsole: errLogToConsole}))
        .pipe($.autoprefixer('last 2 version'))
        .pipe($.concat('main.css'))
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.tmp.styles))
        .pipe($.filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Create JS production bundle.
 */
gulp.task('bundle', 'Create JS production bundle', ['jshint'], function (cb) {
    var Builder = require('systemjs-builder');
    var builder = new Builder();

    builder.loadConfig('./jspm.conf.js')
        .then(function() {
            builder.buildSFX('src/app/bootstrap', paths.tmp.scripts + 'build.js', { sourceMaps: true, config: {sourceRoot: paths.tmp.scripts} })
                .then(function() {
                    return cb();
                })
                .catch(function(ex) {
                    cb(new Error(ex));
                });
        });
});

/**
 * The 'watch' task set up the checks to see if any of the files listed below
 * change, and then to execute the listed tasks when they do.
 */
gulp.task('watch', 'Watch files for changes', function () {
    // Watch images and fonts files
    gulp.watch([paths.app.images, paths.app.fonts], [browserSync.reload]);

    // Watch css files
    gulp.watch(paths.app.styles, ['sass']);

    // Watch js files
    gulp.watch([paths.app.scripts, paths.gulpfile], ['jshint', browserSync.reload]);

    // Watch html files
    gulp.watch([paths.app.html, paths.app.templates], ['htmlhint', browserSync.reload]);
});

/**
 * The 'copy' task just copies files from A to B. We use it here
 * to copy our files that haven't been copied by other tasks
 * e.g. (favicon, etc.) into the `build/dist` directory.
 */
gulp.task('extras', 'Copy project files that haven\'t been copied by \'compile\' task e.g. (favicon, etc.) into the \'build/dist\' directory', function () {
    return gulp.src([paths.app.basePath + '*.{ico,png,txt}'])
        .pipe(gulp.dest(paths.build.dist.basePath));
});

/**
 * The 'fonts' task copies fonts to `build/dist` directory.
 */
gulp.task('fonts', 'Copy fonts to `build/dist` directory', function () {
    return gulp.src(paths.app.fonts)
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.build.dist.fonts))
        .pipe($.size({title: 'fonts'}));
});

/**
 * The 'images' task minifies and copies images to `build/dist` directory.
 */
gulp.task('images', 'Minifies and copies images to `build/dist` directory', function () {
    return gulp.src(paths.app.images)
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(paths.build.dist.images))
        .pipe($.size({title: 'images'}));
});

/**
 * The 'compile' task compile all js, css and html files.
 *
 * 1. it compiles and minify html templates to js template cache
 * 2. css      - replace local path with CDN url, minify, add revision number, add banner header
 *    css_libs - minify, add revision number
 *    js       - annotates the sources before minifying, minify, add revision number, add banner header
 *    js_libs  - minify, add revision number
 *    html     - replace local path with CDN url, minify
 */
gulp.task('compile', 'Does the same as \'jshint\', \'htmlhint\', \'images\', \'templates\' tasks but also compile all JS, CSS and HTML files',
    ['htmlhint', 'sass', 'bundle'], function () {
        var projectHeader = $.header(banner);

        return gulp.src(paths.app.html)
            .pipe($.inject(gulp.src(paths.tmp.scripts + 'build.js', {read: false}), {
                starttag: '<!-- inject:build:js -->',
                ignorePath: [paths.app.basePath]
            }))
            .pipe($.usemin({
                css:        [
                    $.if(!!argv.cdn, $.cdnizer({defaultCDNBase: CDN_BASE, relativeRoot: 'styles', files: ['**/*.{gif,png,jpg,jpeg}']})),
                    $.bytediff.start(),
                    $.minifyCss({keepSpecialComments:0}),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev(),
                    projectHeader
                ],
                js:         [
                    $.if(!!argv.cdn, $.cdnizer({defaultCDNBase: CDN_BASE, relativeRoot: '/', files: ['**/*.{gif,png,jpg,jpeg}']})),
                    $.bytediff.start(),
                    $.ngAnnotate({add: true, single_quotes: true, stats: true}),
                    $.uglify(),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev(),
                    projectHeader
                ],
                html:       [
                    $.if(!!argv.cdn, $.cdnizer({defaultCDNBase: CDN_BASE, files: ['**/*.{js,css}']})),
                    $.bytediff.start(),
                    $.minifyHtml({empty:true}),
                    $.bytediff.stop(bytediffFormatter)
                ]
            }))
            .pipe(gulp.dest(paths.build.dist.basePath))
            .pipe($.size({title: 'compile', showFiles: true}));
    });

/**
 * The 'karma' task run unit tests without coverage check.
 */
//TODO: (martin) should I merge this with `gulp test:unit` task and then just pass argument --coverage (it will run unit test with coverage e.g. gulp test:unit --coverage)
gulp.task('karma', 'Run unit tests without coverage check', function (cb) {
    // remove 'coverage' directory before each test
    del.sync(paths.test.testReports.coverage);
    // run the karma test
    karma.start({
        configFile: path.join(__dirname, paths.test.config.karma),
        browsers: [BROWSERS],
        singleRun: !argv.watch,
        autoWatch: !!argv.watch
    }, function(code) {
        // make sure failed karma tests cause gulp to exit non-zero
        if(code === 1) {
            log(COLORS.red('Error: unit test failed '));
            return process.exit(1);
        }
        cb();
    });
});


//=============================================
//                MAIN TASKS
//=============================================

//---------------------------------------------
//              DEVELOPMENT TASKS
//---------------------------------------------

/**
 * The 'serve' task serve the dev environment.
 */
gulp.task('serve', 'Serve for the dev environment', ['sass', 'watch'], function() {
    startBrowserSync(['.tmp', 'src', 'jspm_packages', './' ]);
});
gulp.task('default', 'Watch files and build environment', ['serve']);

/**
 * The 'serve:dist' task serve the prod environment.
 */
gulp.task('serve:dist', 'Serve the prod environment', ['build'], function() {
    startBrowserSync([paths.build.dist.basePath]);
});

//---------------------------------------------
//                TEST TASKS
//---------------------------------------------

/**
 * The 'test:unit' task run unit tests with coverage check.
 */
gulp.task('test:unit', 'Run unit tests with coverage check', ['karma'], function () {
    var options = {
        thresholds : {
            statements : 95,
            branches : 90,
            lines : 95,
            functions : 95
        },
        coverageDirectory: paths.test.testReports.coverage,
        rootDirectory : paths.test.basePath // keep root `test/` so enforce plugin is not searching in other directories
    };
    return gulp.src('.')
        .pipe($.istanbulEnforcer(options))
        .on('error', function(error) {
            log(error.toString());
            return process.exit(1);
        });
}, {
    options: {
        'browsers=<browserName>' : 'run test against specific browser (PhantomJS|Chrome|Firefox|Safari)',
        'watch': 'watch for file changes and re-run tests on each change'
    }
});

/**
 * The 'test:e2e' task run e2e tests.
 */
// update/install webdriver
gulp.task('webdriver_update', false, $.protractor.webdriver_update);
gulp.task('test:e2e', 'Run e2e tests', ['webdriver_update'], function () {
    //TODO: (martin) remove this line once the issue with PhantomJS is resolved. This code is already declared at the top of this file.
    var BROWSERS = !!argv.browsers ? argv.browsers : 'chrome';

    gulp.src(paths.test.e2e)
        .pipe($.protractor.protractor({
            configFile: path.join(__dirname, paths.test.config.protractor),
            args: ['--baseUrl', APPLICATION_BASE_URL, '--capabilities.browserName', BROWSERS.toLowerCase()] // protractor only accept lowercase browser name
        })).on('error', function () {
            log(COLORS.red('Error: E2E test failed'));
            // make sure failed tests cause gulp to exit non-zero
            return process.exit(1);
        });
}, {
    options: {
        'browsers=<browserName>' : 'run test against specific browser (PhantomJS|Chrome|Firefox|Safari)',
        'production': 'run test against production server'
    }
});

/**
 * The 'test' task run unit and e2e tests.
 */
gulp.task('test', 'Run unit and e2e tests', ['karma'], function () {
    return gulp.start(
        'test:unit',
        'test:e2e'
    );
});

//---------------------------------------------
//               BUILD TASKS
//---------------------------------------------

/**
 * The 'build' task gets app ready for deployment by processing files
 * and put them into directory ready for production.
 */
gulp.task('build', 'Build application for deployment', function (cb) {
    runSequence(
        ['clean'],
        ['compile', 'extras', 'images', 'fonts'],
        cb
    );
}, {
    options: {
        'env=<environment>': 'environment flag (prod|dev|test)',
        'cdn': 'replace local path with CDN url'
    }
});

/**
 * Publish 'build' folder to GitHub 'gh-pages' branch.
 * To deploy with Travis CI:
 *   1. Generate OAuth token on GitHub > Settings > Application page
 *   2. Encrypt and save that token into the `.travis.yml` file by running:
 *      `travis encrypt GITHUB_TOKEN="<your-oauth-token>" --add`
 */
gulp.task('gh-pages', 'Publish \'build\' folder to GitHub \'gh-pages\' branch', function () {
    return gulp.src(paths.build.basePath + '**/*')
        .pipe($.ghPages({remoteUrl: 'https://'+ process.env.GH_TOKEN +'@github.com/'+ process.env.USERNAME +'/'+ process.env.PROJECT_NAME +'.git'}));
});

//---------------------------------------------
//               RELEASE TASKS
//---------------------------------------------

/**
 * The 'bump' task bump version number in package.json.
 */
gulp.task('bump', 'Bump version number in package.json', ['jshint', 'htmlhint', 'test:unit'], function () {
    var HAS_REQUIRED_ATTRIBUTE = !!argv.type ? !!argv.type.match(new RegExp(/major|minor|patch/)) : false;

    if (!HAS_REQUIRED_ATTRIBUTE) {
        log(COLORS.red('Error: Required bump \'type\' is missing! Usage: gulp bump --type=(major|minor|patch)'));
        return process.exit(1);
    }

    if (!semver.valid(pkg.version)) {
        log(COLORS.red('Error: Invalid version number - ' + pkg.version));
        return process.exit(1);
    }

    return gulp.src(['package.json'])
        .pipe($.bump({type: argv.type}))
        .pipe(gulp.dest('./'));
});

/**
 * The 'changelog' task generate changelog.
 */
gulp.task('changelog', 'Generate changelog', function(cb) {
    changelog({
        version: pkg.version
    }, function(err, data) {
        if (err) {
            log(COLORS.red('Error: Failed to generate changelog ' + err));
            return process.exit(1);
        }
        fs.writeFileSync('CHANGELOG.md', data, cb());
    });
});

/**
 * The 'release' task push package.json and CHANGELOG.md to GitHub.
 */
gulp.task('release', 'Release bumped version number to GitHub repo', function (cb) {
    var exec = require('child_process').exec;

    if(!semver.valid(pkg.version)) {
        log(COLORS.red('Error: Invalid version number - ' + pkg.version + '. Please fix the the version number in package.json and run \'gulp publish\' command again.'));
        return process.exit(1);
    }

    exec('git status --porcelain', function (err, stdout) {
        if (err) {return cb(err);}
        if (stdout === '') {
            return cb(new Error('No changes detected in this repo. Aborting release.'));
        }

        log(COLORS.blue('Pushing to GitHub ...'));
        var commitMsg = 'chore(release): v' + pkg.version;

        exec('git add CHANGELOG.md package.json', childProcessCompleted);
        exec('git commit -m "' + commitMsg + '" --no-verify', childProcessCompleted);
        exec('git push origin master', childProcessCompleted);

        cb();
    });

    function childProcessCompleted(error, stdout, stderr) {
        log('stdout: ' + stdout);
        log('stderr: ' + stderr);
        if (error !== null) {
            return cb(error);
        }
    }
});
