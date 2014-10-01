'use strict';

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../../',

        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            // libraries
            'src/vendor/jquery/dist/jquery.js',
            'src/vendor/angular/angular.js',
            'src/vendor/angular-animate/angular-animate.js',
            'src/vendor/bootstrap/dist/js/bootstrap.js',
            'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
            'src/vendor/angular-ui-router/release/angular-ui-router.js',

            // test libraries
            'src/vendor/angular-mocks/angular-mocks.js',

            // our app
            'src/app/**/!(*.spec).js',

            // tests
            'src/app/**/*.spec.js'

            // templates
//            'public/app/**/*.html'
        ],

        // list of files to exclude
        exclude: [
        ],

        // use dots reporter, as Travis terminal does not support escaping sequences;
        // when using Travis publish coverage to coveralls
        reporters: process.env.TRAVIS ? ['dots', 'junit', 'coverage', 'coveralls'] : ['dots', 'junit', 'coverage'],

        junitReporter: {
            // will be resolved to basePath (in the same way as files/exclude patterns)
            outputFile: 'test/test-reports/unit-test-report.xml',
            suite: 'unit'
        },

        preprocessors: {
            // source files, that you wanna generate coverage for - do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '**/src/app/**/!(*.spec).js': 'coverage'
            // TODO: (martin) this might be good for testing templates
            // generate js files from html templates
            // '**/src/app/**/*.html': ['ng-html2js']
        },

        // TODO: (martin) this might be good for testing templates
        ngHtml2JsPreprocessor: {
            // strip this from the file path
//            stripPrefix: 'public/app/',
            // prepend this to the
//            prependPrefix: 'served/',
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
//            moduleName: 'st-templates'
        },

        coverageReporter: {
            reporters: [
                {type: 'html', dir: 'test/test-reports/coverage/'}, // will generate html report
                {type: 'json', dir: 'test/test-reports/coverage/'}, // will generate json report file and this report is loaded to make sure failed coverage cause gulp to exit non-zero
                {type: 'lcov', dir: 'test/test-reports/coverage/'}, // will generate Icov report file and this report is published to coveralls
                {type: 'text-summary', dir: 'test/test-reports/coverage/'} // it does not generate any file but it will print coverage to console
            ]
        },

        // web server port
        // CLI --port 9876
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari

        // (martin) the browser option comes from gulp that's the place where browsers should be specify
        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 20000,

        // Auto run tests on start (when browsers are captured) and exit
        // CLI --single-run --no-single-run
        singleRun: true,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-coveralls',
            'karma-ng-html2js-preprocessor'
        ]
    });
};
