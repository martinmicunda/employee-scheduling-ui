var argvIndex;
process.argv.forEach(function (val, index, array) {
    if(val == '--env') {
        argvIndex = index;
    }
});
var isProduction = process.argv[argvIndex + 1] === 'production' ? true : false;

exports.config = {
    // The address of a running selenium server.
    seleniumServerJar: '../../../node_modules/protractor/selenium/selenium-server-standalone-2.41.0.jar',
    seleniumArgs: ['-browserTimeout=60'],
//    seleniumPort: 4444,
//    seleniumAddress: 'http://localhost:4444/wd/hub',

    // ----- What tests to run -----
    //
    // Spec patterns are relative to the location of this config.
    specs: [
        '../e2e/**/*.js'
    ],

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
//    baseUrl: 'http://127.0.0.1:3000',

//    multiCapabilities: [
////        {
////            'browserName': 'chrome'
////        },
////        {
////            'browserName': 'safari'
////        },
//        {
//            'browserName': 'firefox'
//        },
//        // TODO: (martin) There is issue with phantomJS in Protractor https://github.com/angular/protractor/issues/557
////        {
////
////            'browserName': 'phantomjs'
////            'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',
////            'phantomjs.cli.args': ['--debug=true', '--webdriver-logfile=webdriver.log', '--webdriver-loglevel=DEBUG']
////        }
//    ],

    /**
     * A callback function called once protractor is ready and available,
     * and before the specs are executed.
     *
     * You can specify a file containing code to run by setting onPrepare to
     * the filename string.
     */
    onPrepare: function() {
        // browser.driver.manage().window().setSize(1024,768);

        // Launch the Express server we will run tests against.
        exports.server = require('../../../server/src/server.js');

        /**
         * At this point, global 'protractor' object will be set up, and
         * jasmine will be available.
         *
         * The require statement must be down here, since jasmine-reporters
         * needs jasmine to be in the global and protractor does not guarantee
         * this until inside the onPrepare function.
         */
        require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(null, true, true, './build/test-reports/client/e2e-test-report'));

        var ScreenShotReporter = require('protractor-screenshot-reporter');
        var path = require('path');
        // Add a screenshot reporter and store screenshots to `/tmp/screnshots`:
        jasmine.getEnv().addReporter(new ScreenShotReporter({
            baseDirectory: './build/test-reports/client/screenshots',
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
        /**
         * onComplete will be called just before the driver quits.
         */
        onComplete: function () {
            // Shut down the test Express server.
            exports.server.close();
        },
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