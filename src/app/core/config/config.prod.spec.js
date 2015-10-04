/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

//import {OnConfigProd} from './config.prod.js';
//
//describe('Config', () => {
//    let localStorageServiceProvider, $compileProvider, $httpProvider;
//
//    beforeEach(angular.mock.module('ngDecorator'));
//
//    beforeEach(() => {
//        $httpProvider = jasmine.createSpyObj('$httpProvider', ['useApplyAsync']);
//        $compileProvider = jasmine.createSpyObj('$compileProvider', ['debugInfoEnabled']);
//        localStorageServiceProvider = jasmine.createSpyObj('localStorageServiceProvider', ['setPrefix']);
//
//        OnConfigProd.configFactory($compileProvider, $httpProvider, localStorageServiceProvider);
//    });
//
//    it('should set deal-centre prefix for locale storage', () => {
//        expect(localStorageServiceProvider.setPrefix).toHaveBeenCalledWith('deal-centre');
//    });
//
//    it('should disabling debug data', () => {
//        expect($compileProvider.debugInfoEnabled).toHaveBeenCalledWith(false);
//    });
//
//    it('should configure $http service to combine processing of multiple http responses', () => {
//        expect($httpProvider.useApplyAsync).toHaveBeenCalledWith(true);
//    });
//});
