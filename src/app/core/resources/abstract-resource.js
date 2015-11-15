/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

class AbstractResource {
    constructor(http, route) {
        this.http = http;
        this.route = route;
    }

    get(id, params, cache = false) {
        return this.http.get(`/${this.route}/${id}`, {params: params, cache: cache});
    }

    getList(params, cache = false) {
        return this.http.get(`/${this.route}`, {params: params, cache: cache});
    }

    create(newResource) {
        return this.http.post(`/${this.route}`, newResource);
    }

    update(updatedResource) {
        return this.http.put(`/${this.route}/${updatedResource.id}`, updatedResource);
    }

    delete(id) {
        return this.http.delete(`/${this.route}/${id}`);
    }
}

export default AbstractResource;
