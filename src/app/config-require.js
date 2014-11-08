/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version/dependency  mgt of 3rd party libraries
 */
/*jshint unused:false, -W079*/
var require = {
    baseUrl: '../',
    // alias libraries paths
    // bower:js  //TODO: wiredep paths from bower.json. bower-requirejs ???
    paths: {
        'requireLib': 'vendor/requirejs/require',
        'angular': 'vendor/angular/angular',
        'ngAnimate': 'vendor/angular-animate/angular-animate',
        'ngMessages': 'vendor/angular-messages/angular-messages',
        'ui.router': 'vendor/angular-ui-router/release/angular-ui-router',
        'lodash': 'vendor/lodash/dist/lodash.compat',
        'restangular': 'vendor/restangular/dist/restangular',
        'ui.bootstrap': 'vendor/angular-bootstrap/ui-bootstrap-tpls',
        'es6-shim': 'vendor/es6-shim/es6-shim',
        'angular-local-storage': 'vendor/angular-local-storage/angular-local-storage'
        //'traceur-runtime': '../node_modules/traceur/bin/traceur-runtime'
        //"mm-angular-logger": "0.0.3",
        //"mm-angular-exception-handler": "0.0.1",
        //"mm-angular-error-http-handler": "0.0.1"
    },
    // endbower

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'lodash': {exports: '_'},
        'angular': {exports: 'angular'},
        'ngAnimate': {deps: ['angular']},
        'ngMessages': {deps: ['angular']},
        'ui.router': {deps: ['angular']},
        'restangular': {deps: ['angular', 'lodash']},
        'ui.bootstrap': {deps: ['angular']},
        'angular-local-storage': {deps: ['angular']}
    },
    priority: [
        'angular'
    ]
};
