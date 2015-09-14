'use strict';

var nocoverage = false;
process.argv.forEach(function (val, index) {
    if(val.indexOf('--nocoverage') !== -1 || val.indexOf('--no-coverage') !== -1) {
        nocoverage = true;
    }
});

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        frameworks: ['jspm', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
            'test/test.env.js'
        ],

        jspm: {
            config: 'jspm.conf.js',
            loadFiles: ['src/app/app.js', 'src/app/**/*.spec.js'], //'src/app/**/!(*.e2e|*.po).js'
            serveFiles: ['test/helpers/**/*.js','src/app/**/*.+(js|html|css|json)'] // *.{a,b,c} to *.+(a|b|c) https://github.com/karma-runner/karma/issues/1532
        },

        //reporters: process.argv.slice(2).find((argv) => argv.includes('--nocoverage') || argv.includes('--no-coverage')) ? ['dots', 'junit'] : ['dots', 'junit', 'coverage'],

        // use dots reporter, as Travis terminal does not support escaping sequences;
        // when using Travis publish coverage to coveralls
        reporters: process.env.TRAVIS ? ['dots', 'junit', 'coverage', 'coveralls'] : nocoverage ? ['dots', 'junit'] : ['dots', 'junit', 'coverage'],

        junitReporter: {
            outputDir: 'test-reports/unit-test-report/',
            suite: 'unit'
        },

        preprocessors: {
            // source files, that you wanna generate coverage for - do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/!(*.spec|*.mock|*-mock|*.e2e|*.po).js': ['babel', 'coverage']
        },

        // transpile with babel since the coverage reporter throws error on ES6 syntax
        babelPreprocessor: {
            options: {
                stage: 1
            }
        },

        coverageReporter: {
            instrumenters: { isparta : require('isparta') },
            instrumenter: {
                'src/**/*.js': 'isparta'
            },
            instrumenterOptions: {
                isparta: { babel : { stage: 1 } }
            },
            reporters: [
                {type: 'html', dir: 'test-reports/coverage/'}, // will generate html report
                {type: 'json', dir: 'test-reports/coverage/'}, // will generate json report file and this report is loaded to make sure failed coverage cause gulp to exit non-zero
                {type: 'lcov', dir: 'test-reports/coverage/'}, // will generate Icov report file and this report is published to coveralls
                {type: 'text-summary'} // it does not generate any file but it will print coverage to console
            ]
        },

        proxies: {
            '/test/': '/base/test/',
            '/src/app/': '/base/src/app/',
            '/jspm_packages/': '/base/jspm_packages/'
        },

        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

        plugins: [
            'karma-jasmine',
            'karma-jspm',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-safari-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-coveralls',
            'karma-babel-preprocessor'
        ]
    });
};
