/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

class SettingService {
    constructor(Restangular) {
        'ngInject';
        this.Restangular = Restangular;
    }

    getList() {
        return this.Restangular
            .one('settings')
            .withHttpConfig({cache: true})
            .get();
    }
}

export default SettingService;

