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

    initItem(id) {
        return this.resource.get(id).then(item => this.item = item);
    }

    initCollection(params, cache) {
        return this.resource.getList(params, cache).then(collection => this.collection = collection);
    }
}

export default AbstractModel;
