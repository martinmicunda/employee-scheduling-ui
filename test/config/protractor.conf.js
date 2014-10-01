'use strict';

var path = require('path');
var ScreenShotReporter = require('protractor-html-screenshot-reporter');

exports.config = {
    // The address of a running selenium server.
    seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.43.1.jar',
    seleniumArgs: ['-browserTimeout=60'],

    /**
     * A callback function called once protractor is ready and available,
     * and before the specs are executed.
     *
     * You can specify a file containing code to run by setting onPrepare to
     * the filename string.
     */
    onPrepare: function() {
        browser.driver.manage().window().setSize(1024,768);

        /**
         * At this point, global 'protractor' object will be set up, and
         * jasmine will be available.
         *
         * The require statement must be down here, since jasmine-reporters
         * needs jasmine to be in the global and protractor does not guarantee
         * this until inside the onPrepare function.
         */
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmine.JUnitXmlReporter('xmloutput', true, true, './test/test-reports/e2e-test-report')
        );

        // Add a screenshot reporter and store screenshots to `/test/test-reports/screenshots`:
        jasmine.getEnv().addReporter(new ScreenShotReporter({
            baseDirectory: './test/test-reports/screenshots',
            pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
                // Return '<browser>/<specname>' as path for screenshots:
                // Example: 'firefox/list-should work'.
                return path.join(capabilities.caps_.browserName, descriptions.join('-'));
            },
            takeScreenShotsOnlyForFailedSpecs: true
        }));

    },

    // ----- Options to be passed to minijasminenode -----
    jasmineNodeOpts: {
        // If true, display spec names.
        isVerbose: true,
        // If true, print colors to the terminal.
        showColors: true,
        // If true, include stack traces in failures.
        includeStackTrace: true,
        // Default time to wait in ms before a test fails.
        defaultTimeoutInterval: 30000
    }
};
