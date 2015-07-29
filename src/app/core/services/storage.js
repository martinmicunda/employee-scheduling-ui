/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

// TODO: rename it this storage to CacheStorage
class StorageService {
    constructor(records) {
        this.records = records;
    }

    getList() {
        return this.records;
    }

    setList(records) {
        this.records = records;
    }

    get(id) {
        return this.records.find(record => record.id === id);
    }

    add(record) {
        this.records.push(record);
    }

    update(record) {
        for (let i = 0; i < this.records.length; i++) {
            if(this.records[i].id === record.id) {
                this.records[i] = record;
            }
        }
    }
}

export default StorageService;
