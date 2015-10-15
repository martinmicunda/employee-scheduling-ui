'use strict';

var nocoverage = false, coveralls = false;
process.argv.forEach(function (val, index) {
    if(val.indexOf('--nocoverage') !== -1 || val.indexOf('--no-coverage') !== -1) {
        nocoverage = true;
    }
    if(val.indexOf('--coveralls') !== -1) {
        coveralls = true;
    }
});

module.exports = function (config) {
    config.set({
        frameworks: ['jspm', 'jasmine'],

        files: [
            'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
            'node_modules/jasmine-async-sugar/jasmine-async-sugar.js'
        ],

        jspm: {
            config: 'jspm.conf.js',
            loadFiles: ['src/app/app.js', 'src/app/**/*.spec.js'], //'src/app/**/!(*.e2e|*.po).js'
            serveFiles: ['test/helpers/**/*.js','src/app/**/*.+(js|html|css|json)'] // *.{a,b,c} to *.+(a|b|c) https://github.com/karma-runner/karma/issues/1532
        },

        proxies: {
            '/test/': '/base/test/',
            '/src/app/': '/base/src/app/',
            '/jspm_packages/': '/base/jspm_packages/'
        },

        //reporters: process.argv.slice(2).find((argv) => argv.includes('--nocoverage') || argv.includes('--no-coverage')) ? ['dots', 'junit'] : ['dots', 'junit', 'coverage'],

        // use dots reporter, as Travis terminal does not support escaping sequences;
        // when using Travis publish coverage to coveralls
        reporters: coveralls ? ['dots', 'junit', 'coverage', 'coveralls'] : nocoverage ? ['dots'] : ['dots', 'junit', 'coverage'],

        junitReporter: {
            outputDir: 'test-reports/unit-test-report/',
            suite: 'unit'
        },

        preprocessors: {
            // source files, that you wanna generate coverage for - do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/!(*.spec|*.mock|*-mock|*.e2e|*.po|*.test).js': ['babel', 'coverage']
        },

        // transpile with babel since the coverage reporter throws error on ES6 syntax
        babelPreprocessor: {
            options: {
                stage: 1,
                sourceMap: 'inline'
            }
        },

        coverageReporter: {
            instrumenters: { isparta : require('isparta') },
            instrumenter: {
                'src/**/*.js': 'isparta'
            },
            dir: 'test-reports/coverage/',
            subdir: normalizationBrowserName,
            reporters: [
                {type: 'html'}, // will generate html report
                {type: 'json'}, // will generate json report file and this report is loaded to make sure failed coverage cause gulp to exit non-zero
                {type: 'lcov'}, // will generate Icov report file and this report is published to coveralls
                {type: 'text-summary'} // it does not generate any file but it will print coverage to console
            ]
        },

        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],

        browserNoActivityTimeout: 50000
    });

    function normalizationBrowserName(browser) {
        return browser.toLowerCase().split(/[ /-]/)[0];
    }
};
