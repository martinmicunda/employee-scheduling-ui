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
var bower          = require('bower');
var karma          = require('karma').server;
var moment         = require('moment');
var semver         = require('semver');
var wiredep        = require('wiredep').stream;
var changelog      = require('conventional-changelog');
var runSequence    = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

/**
 * Load Gulp plugins listed in 'package.json' and attaches
 * them to the `$` variable.
 */
/*jshint -W079 */
var $ = require('gulp-load-plugins')();


//=============================================
//   !!!FEEL FREE TO EDIT THESE VARIABLES!!!
//=============================================

var MODULE_NAME          = 'locationManager';
var PRODUCTION_URL       = 'http://your-production-url.com';
var DEVELOPMENT_URL      = 'http://127.0.0.1:3000';
var PRODUCTION_CDN_URL   = 'http://cdn.your-production-url.com';
var TEMPLATE_BASE_PATH   = 'app';


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

/*global paths: true*/
function excludeFiles() {
    var configEnvFile = [];

    switch(ENV) {
        case 'dev':
            configEnvFile = ['!' + paths.app.config.test, '!' + paths.app.config.prod, '!' + paths.test.mock];
            break;
        case 'test':
            configEnvFile = ['!' + paths.app.config.dev, '!' + paths.app.config.prod];
            break;
        case 'prod':
            configEnvFile = ['!' + paths.app.config.dev, '!' + paths.app.config.test, '!' + paths.test.mock];
            break;
    }
    return configEnvFile;
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
        fonts:          'src/fonts/**/*.{eot,svg,ttf,woff}',
        styles:         'src/styles/**/*.scss',
        images:         'src/images/**/*.{png,gif,jpg,jpeg}',
        config: {
            dev:        'src/app/core/config/core.config.dev.js',
            test:       'src/app/core/config/core.config.test.js',
            prod:       'src/app/core/config/core.config.prod.js'
        },
        scripts:        ['src/app/**/*.module.js',
            'src/app/**/*.js',
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
        mock:           'src/app/**/*.mock.js',
        unit:           'src/app/**/*.spec.js',
        e2e:            'test/e2e/**/*.e2e.js'
    },
    /**
     * The 'vendor' folder is where our bower dependencies are hold.
     */
    vendor:             'src/vendor/',
    /**
     * The 'tmp' folder is where our html templates are compiled to JavaScript during
     * the build process and then they are concatenating with all other js files and
     * copy to 'dist' folder.
     */
    tmp: {
        basePath:       'src/.tmp/',
        styles:         'src/.tmp/styles/',
        scripts:        'src/.tmp/scripts/'
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
    ' * @author <%= pkg.author %>\n' +
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
    return del([paths.build.basePath, paths.tmp.basePath], cb);
});

/**
 * The 'bower-install' task install all bower components specify in `bower.json`
 * from bower repository and inject bower components into the `index.html`.
 */
gulp.task('bower-install', 'Install all bower dependencies specify in bower.json and inject them into the index.html', function () {
    bower.commands.install([], {}, {})
        .on('end', function(){
            return gulp.src(paths.app.html)
                .pipe(wiredep({
                    directory: paths.vendor,
                    ignorePath: paths.app.basePath
                }))
                .pipe(gulp.dest(paths.app.basePath))
                .pipe($.size({title: 'bower'}));
        })
        .on('error', function (error) {
            log(COLORS.red(error));
            return process.exit(1);
        });
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
gulp.task('styles', 'Compile sass files into the main.css', function () {
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
        .pipe(gulp.dest(paths.tmp.styles));
});

gulp.task('scripts', 'Compile JS files into the app.js', function (cb) {
    var builder = require('systemjs-builder');
    builder.reset();

    builder.loadConfig('./src/jspm.conf.js')
        .then(function() {
            builder.loader.baseURL = path.resolve('./src/');
            builder.build('app/app', paths.tmp.scripts + 'app.js', { sourceMaps: true, config: {sourceRoot: 'src/.tmp/scripts/'} })
                .then(function() {
                    return cb();
                })
                .catch(function(ex) {
                    cb(new Error(ex));
                });
        });
});

 /**
 * Compile JS files into the app.js.
 */
gulp.task('scriptss', 'Compile JS files into the app.js', ['jshint'], function () {
    //var to5 = require('gulp-6to5');
    var pp = {
        modules: 'instantiate',
        types: true,
        typeAssertions: true,
        annotations: true,
        typeAssertionModule: 'assert',
        experimental: true
    };
    return gulp.src(paths.app.scripts.concat(excludeFiles()))
        .pipe($.sourcemaps.init())
        .pipe($.traceur(pp))
        //.pipe(to5({modules: 'amd'}))
        //.pipe($.concat('app.js'))
        //.pipe($.ngAnnotate({add: true, single_quotes: true, stats: true}))
        //.pipe($.uglify())
        .pipe($.sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.tmp.scripts));
});

/**
 * The 'watch' task set up the checks to see if any of the files listed below
 * change, and then to execute the listed tasks when they do.
 */
gulp.task('watch', 'Watch files for changes', function () {
    // Listen on port 35729
    $.livereload.listen();

    // Watch images and fonts files
    gulp.watch([paths.app.images, paths.app.fonts]);

    // Watch css files
    gulp.watch(paths.app.styles, ['styles']);

    // Watch js files
    gulp.watch([paths.app.scripts, paths.gulpfile], ['scripts']);

    // Watch html files
    gulp.watch([paths.app.html, paths.app.templates], ['htmlhint']);

    // Watch bower file
    gulp.watch('bower.json', ['bower-install']);

    // this is just hack solution see https://github.com/vohof/gulp-livereload/issues/36
    gulp.on('stop', function(){
        $.livereload.changed();
    });
});

/**
 * The 'copy' task just copies files from A to B. We use it here
 * to copy our files that haven't been copied by other tasks
 * e.g. (bower.json, favicon, etc.) into the `build/dist` directory.
 */
gulp.task('extras', 'Copy project files that haven\'t been copied by \'compile\' task e.g. (bower.json, favicon, etc.) into the \'build/dist\' directory', function () {
    return gulp.src([paths.app.basePath + '*.{ico,png,txt}', 'bower.json'])
        .pipe(gulp.dest(paths.build.dist.basePath));
});

/**
 * The 'fonts' task copies fonts to `build/dist` directory.
 */
gulp.task('fonts', 'Copy fonts to `build/dist` directory', function () {
    return gulp.src(mainBowerFiles().concat(paths.app.fonts))
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
 * The 'templates' task replace local links with CDN links, minify
 * all project html templates and create template cache js file.
 */
gulp.task('templatecache', 'Minify html templates and create template cache js file', function() {
    return gulp.src(paths.app.templates)
        .pipe($.if(!!argv.cdn, $.cdnizer({defaultCDNBase: CDN_BASE, relativeRoot: '/', files: ['**/*.{gif,png,jpg,jpeg}']})))
        .pipe($.minifyHtml({empty:true}))
        .pipe($.angularTemplatecache({
            module: MODULE_NAME,
            root: TEMPLATE_BASE_PATH
        }))
        .pipe(gulp.dest(paths.tmp.scripts));
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
    ['jshint', 'htmlhint', 'templatecache', 'styles', 'scripts'], function () {
        var projectHeader = $.header(banner);

        return gulp.src(paths.app.html)
            .pipe($.inject(gulp.src(paths.tmp.scripts + 'templates.js', {read: false}), {
                starttag: '<!-- inject:templates:js -->',
                ignorePath: [paths.app.basePath]
            }))
            .pipe($.usemin({
                css:        [
                    $.if(!!argv.cdn, $.cdnizer({defaultCDNBase: CDN_BASE, relativeRoot: 'styles', files: ['**/*.{gif,png,jpg,jpeg}']})),
                    $.bytediff.start(),
                    $.minifyCss(),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev(),
                    projectHeader
                ],
                css_libs:   [
                    $.bytediff.start(),
                    $.minifyCss(),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev()
                ],
                js:         [
                    $.bytediff.start(),
                    $.uglify(),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev(),
                    projectHeader
                ],
                js_libs:    [
                    $.bytediff.start(),
                    $.uglify(),
                    $.bytediff.stop(bytediffFormatter),
                    $.rev()
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

/**
 * The 'setup' task is to configure environment, compile SASS to CSS,
 * install bower dependencies and inject installed bower dependencies
 * into the `index.html`.
 */
gulp.task('setup', 'Configure environment, compile SASS to CSS and install bower dependencies',  function (cb) {
    runSequence(
        ['bower-install', 'styles', 'scripts'],
        cb
    );
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
gulp.task('serve', 'Serve for the dev environment', ['setup', 'watch'], function() {
    gulp.src([paths.app.basePath])
        .pipe($.webserver({
            fallback: 'index.html',
            open: true
        }));
});
gulp.task('default', 'Watch files and build environment', ['serve']);

/**
 * The 'serve:dist' task serve the prod environment.
 */
gulp.task('serve:dist', 'Serve the prod environment', ['build'], function() {
    gulp.src(paths.build.dist.basePath)
        .pipe($.webserver({
            fallback: 'index.html',
            open: true
        }));
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
        ['clean', 'bower-install'],
        ['compile', 'extras', 'images', 'fonts'],
        cb
    );
}, {
    options: {
        'env=<environment>': 'environment flag (prod|dev|test)',
        'cdn': 'replace local path with CDN url'
    }
});

//---------------------------------------------
//               RELEASE TASKS
//---------------------------------------------

/**
 * The 'bump' task bump version number in package.json & bower.json.
 */
gulp.task('bump', 'Bump version number in package.json & bower.json', ['jshint', 'htmlhint', 'test:unit'], function () {
    var HAS_REQUIRED_ATTRIBUTE = !!argv.type ? !!argv.type.match(new RegExp(/major|minor|patch/)) : false;

    if (!HAS_REQUIRED_ATTRIBUTE) {
        log(COLORS.red('Error: Required bump \'type\' is missing! Usage: gulp bump --type=(major|minor|patch)'));
        return process.exit(1);
    }

    if (!semver.valid(pkg.version)) {
        log(COLORS.red('Error: Invalid version number - ' + pkg.version));
        return process.exit(1);
    }

    return gulp.src(['package.json', 'bower.json'])
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
 * The 'release' task push bower.json, package.json and CHANGELOG.md to GitHub.
 */
gulp.task('release', 'Release bumped version number to GitHub repo', function (cb) {
    var exec = require('child_process').exec;

    if(!semver.valid(pkg.version)) {
        log(COLORS.red('Error: Invalid version number - ' + pkg.version + '. Please fix the the version number in package.json and run \'gulp publish\' command again.'));
        return process.exit(1);
    }

    if(!semver.valid(require('./bower.json').version)) {
        log(COLORS.red('Error: Invalid version number - ' + pkg.version + '. Please fix the the version number in bower.json and run \'gulp publish\' command again.'));
        return process.exit(1);
    }

    exec('git status --porcelain', function (err, stdout) {
        if (err) {return cb(err);}
        if (stdout === '') {
            return cb(new Error('No changes detected in this repo. Aborting release.'));
        }

        log(COLORS.blue('Pushing to GitHub ...'));
        var commitMsg = 'chore(release): v' + pkg.version;

        exec('git add CHANGELOG.md package.json bower.json', childProcessCompleted);
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
