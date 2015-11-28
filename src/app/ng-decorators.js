/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import angular from 'angular';

const app = angular.module('ngDecorator', [
    // angular modules
    'ngAnimate',
    'ngMessages',
    'ngSanitize',

    // 3rd party modules
    'ui.router',
    'ui.bootstrap',
    'ui.calendar',
    'LocalStorageModule',
    'colorpicker.module',
    'jp.ng-bs-animated-button',
    'siTable',
    'ngFileUpload'
]);

function Run() {
    return function decorator(target, key, descriptor) {
        app.run(descriptor.value);
    };
}

function Config() {
    return function decorator(target, key, descriptor) {
        app.config(descriptor.value);
    };
}

function Service(options) {
    return function decorator(target) {
        options = options ? options : {};
        if (!options.serviceName) {
            throw new Error('@Service() must contains serviceName property!');
        }
        app.service(options.serviceName, target);
    };
}

function Filter(filter) {
    return function decorator(target, key, descriptor) {
        filter = filter ? filter : {};
        if (!filter.filterName) {
            throw new Error('@Filter() must contains filterName property!');
        }
        app.filter(filter.filterName, descriptor.value);
    };
}

function Inject(...dependencies) {
    return function decorator(target, key, descriptor) {
        // if it's true then we injecting dependencies into function and not Class constructor
        if(descriptor) {
            const fn = descriptor.value;
            fn.$inject = dependencies;
        } else {
            target.$inject = dependencies;
        }
    };
}

function Component(component) {
    return function decorator(target) {
        component = component ? component : {};
        if (!component.selector) {
            throw new Error('@Component() must contains selector property!');
        }

        if (target.$initView) {
            target.$initView(component.selector);
        }

        target.$isComponent = true;
    };
}

function View(view) {
    let options = view ? view : {};
    const defaults = {
        template: options.template,
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
            directiveName = pascalCaseToCamelCase(directiveName);
            directiveName = dashCaseToCamelCase(directiveName);

            options.bindToController = options.bindToController || options.bind || {};

            app.directive(directiveName, function () {
                return Object.assign(defaults, { controller: target }, options);
            });
        };

        target.$isView = true;
    };
}

function Directive(options) {
    return function decorator(target) {
        const directiveName = dashCaseToCamelCase(options.selector);
        app.directive(directiveName, target.directiveFactory);
    };
}

function RouteConfig(stateName, options) {
    return function decorator(target) {
        app.config(['$stateProvider', ($stateProvider) => {
            $stateProvider.state(stateName, Object.assign({
                controller: target,
                controllerAs: 'vm'
            }, options));
        }]);
        app.controller(target.name, target);
    };
}

// Utils functions
function pascalCaseToCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
}

function dashCaseToCamelCase(string) {
    return string.replace( /-([a-z])/ig, function( all, letter ) {
        return letter.toUpperCase();
    });
}

export default app;
export {Component, View, RouteConfig, Inject, Run, Config, Service, Filter, Directive};
