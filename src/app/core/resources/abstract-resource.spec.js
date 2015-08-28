/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import 'angular';
import 'angular-mocks';
import AbstractResource from './abstract-resource.js';

describe('AbstractResource', () => {

    let abstractResource, $httpBackend, route = 'test', id = '1', item = {id: id, test: 'test'};

    beforeEach(inject((_$httpBackend_, _$http_) => {
        $httpBackend = _$httpBackend_;
        abstractResource = new AbstractResource(_$http_, route);
    }));

    afterEach(inject(($httpBackend) => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('should call GET resource with `id`', () => {
        $httpBackend.whenGET(`/${route}/${id}`).respond();

        abstractResource.get(`${id}`);

        $httpBackend.flush();
    });

    it('should call GET LIST resource with `params`', () => {
        $httpBackend.whenGET(`/${route}?param=test1`).respond();

        abstractResource.getList({param: 'test1'}, true);

        $httpBackend.flush();
    });

    it('should call GET LIST resource without `params`', () => {
        $httpBackend.whenGET(`/${route}`).respond();

        abstractResource.getList();

        $httpBackend.flush();
    });

    it('should call POST resource', () => {
        $httpBackend.whenPOST(`/${route}`).respond(() => [201, item]);

        abstractResource.create(item).then((respond) => {
            expect(respond.data).toEqual(item);
        });

        $httpBackend.flush();
    });

    it('should call PUT resource', () => {
        $httpBackend.whenPUT(`/${route}/${id}`).respond(() => [200, item]);

        abstractResource.update(item).then((respond) => {
            expect(respond.data).toEqual(item);
        });

        $httpBackend.flush();
    });

    it('should call DELETE resource', () => {
        $httpBackend.whenDELETE(`/${route}/${id}`).respond();

        abstractResource.delete(id);

        $httpBackend.flush();
    });
});
