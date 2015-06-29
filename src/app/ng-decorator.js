/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

/**
 * We just have one angular module that include all others.
 */
const app = angular.module('ngDecorator', [
    // angular modules
    'ngAnimate',
    'ngMessages',

    // 3rd party modules
    'restangular',
    'ui.router',
    'ui.bootstrap',
    'LocalStorageModule',
    'jp.ng-bs-animated-button'
]);

function Run() {
    return function decorator(Class) {
        app.run(Class.runFactory);
    };
}

function Config() {
    return function decorator(Class) {
        app.config(Class.configFactory);
    };
}

function Service(options) {
    return function decorator(Class) {
        app.service(options.serviceName, Class);
    };
}

function Filter(filter) {
    return function decorator(Class) {
        if (!filter.filterName) {
            throw new Error('@Filter() must contains filterName property!');
        }
        app.filter(filter.filterName, Class.filterFactory);
    };
}

function Inject(...dependencies) {
    return function decorator(Class) {
        Class.$inject = dependencies;
    };
}

function Component(component) {
    return function decorator(Class) {
        if (typeof component !== 'object') {
            throw new Error('@Component() must be defined!');
        }

        if (Class.$initView) {
            Class.$initView(component.selector);
        }

        Class.$isComponent = true;
    };
}

function View(view) {
    let options = view;
    const defaults = {
        template: view.template,
        restrict: 'E',
        scope: {},
        bindToController: true,
        controllerAs: 'vm'
    };
    return function decorator(target) {
        if (target.$isComponent) {
            throw new Error('@View() must be placed after @Component()!');
        }

        target.$initView = function(directiveName) {
            if (typeof directiveName === 'object') {
                options = directiveName;
                directiveName = pascalCaseToCamelCase(target.name);
            } else {
                directiveName = pascalCaseToCamelCase(directiveName);
            }
            options = options || (options = {});
            options.bindToController = options.bindToController || options.bind || {};

            app.directive(directiveName, function () {
                return Object.assign(defaults, { controller: target }, options);
            });
        };

        target.$isView = true;
    };
}

function Directive(options) {
    return function decorator(Class) {
        const directiveName = dashCaseToCamelCase(options.selector);
        app.directive(directiveName, Class.directiveFactory);
    };
}

function RouteConfig(stateName, options) {
    return function decorator(Class) {
        app.config(['$stateProvider', ($stateProvider) => {
            $stateProvider.state(stateName, Object.assign({
                controller: Class,
                controllerAs: 'vm'
            }, options));
        }]);
        app.controller(Class.name, Class);
    };
}

// Utils functions
function pascalCaseToCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
}
//function camelCaseToDashCase(str) {
//    return str.replace(/[A-Z]/g, function($1) {
//        return '-' + $1.toLowerCase();
//    });
//}
function dashCaseToCamelCase(string) {
    return string.replace( /-([a-z])/ig, function( all, letter ) {
        return letter.toUpperCase();
    });
}

export default app;
export {Component, View, RouteConfig, Inject, Run, Config, Service, Filter, Directive};


