/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

class AbstractModel {
    constructor(resource) {
        this.item = {};
        this.collection = [];
        this.resource = resource;
    }

    initItem(id, params, cache) {
        if(id) {
            return this.resource.get(id, params, cache).then(item => this.item = item);
        } else {
            this.item = {};
            /*
             return and resolve helper promise to assure
             consistent API of method so that we can always
             use .then() method when calling initItem
             */
            return Promise.resolve();
        }
    }

    initCollection(params, cache) {
        return this.resource.getList(params, cache).then(collection => this.collection = collection);
    }

    getItemById(id) {
        return this.collection.find(item => item.id === id);
    }

    getItem() {
        return this.item;
    }

    setItem(item) {
        this.item = item;
    }

    getCollection() {
        return this.collection;
    }

    setCollection(collection) {
        this.collection = collection;
    }

    save(item) {
        // update existing item if model contains id
        if (item.id) {
            return this.resource.update(item).then(itemRespond => {
                item.cas = itemRespond.cas;

                for (let i = 0; i < this.collection.length; i++) {
                    if(this.collection[i].id === item.id) {
                        Object.assign(this.collection[i], item);
                    }
                }
            });
        } else {
            return this.resource.create(item).then(itemRespond => {
                item.id = itemRespond.id;
                item.cas = itemRespond.cas;
                this.collection.push(item);
            });
        }
    }

    delete(item) {
        return this.resource.delete(item.id).then(() => {
            this.collection.splice(this.collection.indexOf(item), 1);
        });
    }
}

export default AbstractModel;
