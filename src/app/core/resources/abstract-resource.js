/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

//http://stackoverflow.com/questions/25046191/is-it-good-practice-to-combine-create-and-edit-controllers-in-angularjs

class AbstractResource {
    constructor(restangular, route) {
        this.restangular = restangular;
        this.route = route;
    }

    get(id) {
        return this.restangular
            .one(this.route, id)
            .get();
    }

    getList(params, cache) {
        return this.restangular
            .all(this.route)
            .withHttpConfig({cache: cache ? true : false})
            .getList(params);
    }

    create(newResource) {
        return this.restangular
            .all(this.route)
            .post(newResource);
    }

    update(updatedResource) {
        return updatedResource.put();
    }

    delete(id) {
        return this.restangular
            .one(this.route, id)
            .remove();
    }
}

export default AbstractResource;
