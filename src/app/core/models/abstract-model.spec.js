/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AbstractModel from './abstract-model';
import AbstractResource from '../resources/abstract-resource';

describe('AbstractModel', () => {

    let $q, $rootScope, abstractResource, abstractModel, route = 'test', id = '1', item = {id: id, test: 'test'}, collection = [item];

    beforeEach(inject((_$q_, _$http_, _$rootScope_) => {
        $q = _$q_;
        $rootScope = _$rootScope_;

        abstractResource = new AbstractResource(_$http_, route);
        abstractModel = new AbstractModel(abstractResource);
    }));

    afterEach(inject(($httpBackend) => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it(`should have 'resource' property`, () => {
        expect(abstractModel.resource).toEqual(abstractResource);
    });

    it(`should have empty 'item' property object`, () => {
        expect(abstractModel.item).toEqual({});
    });

    it(`should have empty 'collection' array`, () => {
        expect(abstractModel.collection.length).toEqual(0);
    });

    it(`should set/get item`, () => {
        expect(abstractModel.getItem()).toEqual({});
        abstractModel.setItem(item);
        expect(abstractModel.getItem()).toEqual(item);
    });

    it('should set/get collection', () => {
        expect(abstractModel.getCollection().length).toEqual(0);
        abstractModel.setCollection(collection);
        expect(abstractModel.getCollection().length).toEqual(1);
    });

    it('should get item by id from collection', () => {
        abstractModel.setCollection(collection);
        expect(abstractModel.getItemById(id)).toEqual(item);
    });

    it('should init item via GET request', () => {
        spyOn(abstractModel.resource, 'get').and.returnValue($q.when(item));

        expect(abstractModel.getItem()).toEqual({});

        abstractModel.initItem(id).then(() => {
            expect(abstractModel.getItem()).toEqual(item);
        });

        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(abstractModel.resource.get).toHaveBeenCalledWith(id);
    });

    it('should init item without GET request', () => {
        spyOn(abstractModel.resource, 'get');

        abstractModel.setItem(item);
        expect(abstractModel.getItem()).toEqual(item);

        abstractModel.initItem(null).then(() => {
            expect(abstractModel.getItem()).toEqual({});
        });

        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(abstractModel.resource.get).not.toHaveBeenCalled();
    });

    it('should init empty item with GET request', () => {
        spyOn(abstractModel.resource, 'get').and.returnValue($q.when(item));

        expect(abstractModel.getItem()).toEqual({});

        abstractModel.initItem(id).then(() => {
            expect(abstractModel.getItem()).toEqual(item);
        });

        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(abstractModel.resource.get).toHaveBeenCalledWith(id);
    });

    it('should init collection with GET LIST request', () => {
        spyOn(abstractModel.resource, 'getList').and.returnValue($q.when(collection));

        expect(abstractModel.getCollection().length).toEqual(0);

        abstractModel.initCollection(item, false).then(() => {
            expect(abstractModel.getCollection().length).toEqual(1);
        });

        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(abstractModel.resource.getList).toHaveBeenCalledWith(item, false);
    });

    it('should update item in collection', () => {
        let itemUpdated = Object.assign({}, item);
        itemUpdated.test = 'test-updated';
        spyOn(abstractModel.resource, 'update').and.returnValue($q.when(itemUpdated));

        abstractModel.collection = [{id: '2', test: 'test-2'}, collection[0]]; // required to increase statements coverage in updateCollectionItem for-loop
        abstractModel.save(item).then(() => {
            expect(abstractModel.getCollection()[1].test).toEqual(itemUpdated.test);
        });

        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(abstractModel.resource.update).toHaveBeenCalledWith(item);
    });

    it('should create item and push item to collection', () => {
        let newItem = Object.assign({}, item);
        newItem.id = null;
        spyOn(abstractModel.resource, 'create').and.returnValue($q.when(item));

        expect(abstractModel.getCollection().length).toEqual(0);

        abstractModel.save(newItem).then(() => {
            expect(abstractModel.getCollection()[0].id).toEqual(item.id);
        });

        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(abstractModel.resource.create).toHaveBeenCalledWith(newItem);
    });

    it('should delete item from collection', () => {
        spyOn(abstractModel.resource, 'delete').and.returnValue($q.when({}));

        abstractModel.setCollection(collection);
        expect(abstractModel.getCollection().length).toEqual(1);

        abstractModel.delete(item).then(() => {
            expect(abstractModel.getCollection().length).toEqual(0);
        });
        $rootScope.$digest(); // resolve the promise (hacky way how to resolve promise in angular)

        expect(abstractModel.resource.delete).toHaveBeenCalledWith(item.id);
    });
});
