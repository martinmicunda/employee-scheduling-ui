/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import AbstractModel from './abstract-model';
import AbstractResource from '../resources/abstract-resource';

describe('AbstractModel', () => {

    let abstractResource, abstractModel, route = 'test', id = '1', item = {id: id, test: 'test'}, collection = [item];

    beforeEach(() => {
        abstractResource = new AbstractResource({}, route);
        abstractModel = new AbstractModel(abstractResource);
    });

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

    itAsync('should init item via GET request', () => {
        spyOn(abstractModel.resource, 'get').and.returnValue(Promise.resolve(item));

        expect(abstractModel.getItem()).toEqual({});

        return abstractModel.initItem(id).then(() => {
            expect(abstractModel.getItem()).toEqual(item);
            expect(abstractModel.resource.get).toHaveBeenCalledWith(id);
        });
    });

    itAsync('should init empty item with GET request', () => {
        spyOn(abstractModel.resource, 'get').and.returnValue(Promise.resolve(item));

        expect(abstractModel.getItem()).toEqual({});

        return abstractModel.initItem(id).then(() => {
            expect(abstractModel.getItem()).toEqual(item);
            expect(abstractModel.resource.get).toHaveBeenCalledWith(id);
        });
    });

    itAsync('should init item without GET request', () => {
        spyOn(abstractModel.resource, 'get');

        abstractModel.setItem(item);
        expect(abstractModel.getItem()).toEqual(item);

        return abstractModel.initItem(null).then(() => {
            expect(abstractModel.getItem()).toEqual({});
            expect(abstractModel.resource.get).not.toHaveBeenCalled();
        });
    });

    itAsync('should init collection with GET LIST request', () => {
        spyOn(abstractModel.resource, 'getList').and.returnValue(Promise.resolve(collection));

        expect(abstractModel.getCollection().length).toEqual(0);

        return abstractModel.initCollection(item, false).then(() => {
            expect(abstractModel.getCollection().length).toEqual(1);
            expect(abstractModel.resource.getList).toHaveBeenCalledWith(item, false);
        });
    });

    itAsync('should update item in collection', () => {
        let itemUpdated = Object.assign({}, item);
        itemUpdated.test = 'test-updated';
        spyOn(abstractModel.resource, 'update').and.returnValue(Promise.resolve(itemUpdated));

        abstractModel.collection = [{id: '2', test: 'test-2'}, collection[0]]; // required to increase statements coverage in updateCollectionItem for-loop
        return abstractModel.save(item).then(() => {
            expect(abstractModel.getCollection()[1].test).toEqual(itemUpdated.test);
            expect(abstractModel.resource.update).toHaveBeenCalledWith(item);
        });
    });

    itAsync('should create item and push item to collection', () => {
        let newItem = Object.assign({}, item);
        newItem.id = null;
        spyOn(abstractModel.resource, 'create').and.returnValue(Promise.resolve(item));

        expect(abstractModel.getCollection().length).toEqual(0);

        return abstractModel.save(newItem).then(() => {
            expect(abstractModel.getCollection()[0].id).toEqual(item.id);
            expect(abstractModel.resource.create).toHaveBeenCalledWith(newItem);
        });
    });

    itAsync('should delete item from collection', () => {
        spyOn(abstractModel.resource, 'delete').and.returnValue(Promise.resolve({}));

        abstractModel.setCollection(collection);
        expect(abstractModel.getCollection().length).toEqual(1);

        return abstractModel.delete(item).then(() => {
            expect(abstractModel.getCollection().length).toEqual(0);
            expect(abstractModel.resource.delete).toHaveBeenCalledWith(item.id);
        });
     });
});
