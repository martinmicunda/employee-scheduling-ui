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

    initItem(id) {
        if(id) {
            return this.resource.get(id).then(item => this.item = item);
        } else {
            this.item = {};
            /*
             return and resolve helper promise to assure
             consistent API of method so that we can always
             use .then() method when calling initItem
             */
            // TODO: add resolve promise
            //return PromiseService.resolve();
            //return new Promise(function (resolve, reject) {
            //    setTimeout(resolve, ms); // (A)
            //});
        }
    }

    initCollection(params, cache) {
        return this.resource.getList(params, cache).then(collection => this.collection = collection);
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

    getById(id) {
        return this.collection.find(item => item.id === id);
    }

    setCollection(collection) {
        this.collection = collection;
    }

    save(item) {
        // update existing item if model contains id
        if (item.id) {
            return this.resource.update(item).then(itemRespond => {
                //this.updateCollectionItem(itemRespond);
                for (let i = 0; i < this.collection.length; i++) {
                    if(this.collection[i].id === itemRespond.id) {
                        this.collection[i] = itemRespond;
                    }
                }
            });
        } else {
            return this.resource.create(item).then(itemRespond => {
                item.id = itemRespond.id;
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
