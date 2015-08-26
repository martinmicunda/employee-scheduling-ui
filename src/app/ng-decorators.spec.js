/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import mainModule, {Service, Directive, Component, RouteConfig, Run, Filter, Config, Inject, View} from './ng-decorators.js'; // jshint unused: false

describe('ngDecorators', () => {

    beforeEach(angular.mock.module(mainModule.name));

    describe('Run', () => {
        it('should create a run block', () => {
            class OnRun {
                //start-non-standard
                @Run()
                //end-non-standard
                static runFactory($rootScope) {
                    $rootScope.hasCreatedAngularRunBlock = true;
                }
            }

            inject(($rootScope) => {
                expect($rootScope.hasCreatedAngularRunBlock).toEqual(true);
            });
        });
    });

    describe('Service', () => {
        it('should create a service', () => {
            //start-non-standard
            @Service({
                serviceName: 'NgService'
            })
            //end-non-standard
            class NgService {
                doSomething() {
                    return 'service';
                }
            }

            inject((NgService) => {
                expect(NgService.doSomething()).toEqual('service');
            });
        });

        it('should throw error if @Service() does not have serviceName property', () => {
            expect(() => {
                //start-non-standard
                @Service()
                //end-non-standard
                class NgService {
                    doSomething() {
                        return 'service';
                    }
                }
            }).toThrowError('@Service() must contains serviceName property!');
        });
    });

    describe('Filter', () => {
        it('should create a filter', () => {
            class NgFilter {
                //start-non-standard
                @Filter({
                    filterName: 'increment'
                })
                //end-non-standard
                static incrementFilter() {
                    return (input) => {
                        return input + 1;
                    };
                }
            }

            inject((incrementFilter) => {
                expect(incrementFilter(2)).toEqual(3);
            });
        });

        it('should throw error if @Filter() does not have filterName property', () => {
            expect(() => {
                class NgFilter {
                    //start-non-standard
                    @Filter()
                    //end-non-standard
                    static incrementFilter() {
                        return (input) => {
                            return input + 1;
                        };
                    }
                }
            }).toThrowError('@Filter() must contains filterName property!');
        });
    });

    describe('Inject', () => {
        it('should inject dependencies to class', () => {
            //start-non-standard
            @Inject('test1', 'test2')
            //end-non-standard
            class NgFilter {}

            expect(angular.injector().annotate(NgFilter)).toEqual(['test1', 'test2']);
        });

        it('should inject dependencies into function', () => {
            class NgFilter {
                //start-non-standard
                @Inject('test1', 'test2')
                //end-non-standard
                static functionInject() {}
            }

            expect(NgFilter.functionInject.$inject).toEqual(['test1', 'test2']);
            expect(angular.injector().annotate(NgFilter)).toEqual([]);
        });
    });

    describe('Component', () => {
        it('should create a component', () => {
            //start-non-standard
            @Component({
                selector: 'test-component'
            })
            @View({
                template: '<div class="test-class"></div>'
            })
            //end-non-standard
            class NgComponent {}

            inject(($compile, $rootScope) => {
                let element = $compile('<test-component></test-component>')($rootScope);
                $rootScope.$apply();

                expect(element.html()).toEqual('<div class="test-class"></div>');
            });
        });

        it('should throw error if @Component() does not have selector property', () => {
            expect(() => {
                //start-non-standard
                @Component()
                //end-non-standard
                class NgComponent {}
            }).toThrowError('@Component() must contains selector property!');
        });

        it('should throw error if @View() before @Component()', () => {
            expect(() => {
                //start-non-standard
                @View()
                @Component({
                    selector: 'test-component'
                })
                //end-non-standard
                class NgComponent {}
            }).toThrowError('@View() must be placed after @Component()!');
        });
    });

    describe('Directive', () => {
        it('should create a directive', () => {
            //start-non-standard
            @Directive({
                selector: 'test-directive'
            })
            //end-non-standard
            class NgDirective {
                constructor() {
                    this.restrict = 'A';
                    this.scope = {
                        test: '@'
                    };
                }

                link(scope, element, attrs) {
                    element.addClass('test-class');
                }

                static directiveFactory(){
                    NgDirective.instance = new NgDirective();
                    return NgDirective.instance;
                }
            }

            inject(($compile, $rootScope) => {
                let element = $compile('<div test-directive="test"></div>')($rootScope);
                $rootScope.$apply();

                expect(element.attr('test-directive')).toEqual('test');
                expect(element.hasClass('test-class')).toEqual(true);
            });
        });
    });

    describe('RouteConfig', () => {
        it('should create a route', () => {
            //start-non-standard
            @RouteConfig('test', {
                url: '/test',
                template: '<test></test>'
            })
            //end-non-standard
            class NgRouteConfig{}

            inject(($state) => {
                let currentState = $state.get('test');

                expect(currentState.controller).toEqual(NgRouteConfig);
                expect(currentState.controllerAs).toEqual('vm');
                expect(currentState.template).toEqual('<test></test>');
                expect($state.href('test', {})).toEqual('/test');
            });
        });
    });
});
