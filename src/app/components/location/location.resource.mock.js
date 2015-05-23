/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import locations from './fixtures/locations.json!json';

function locationResourceMock($httpBackend) {
    'ngInject';

    $httpBackend.whenGET(/\/locations/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, locations];
        });
}

export default locationResourceMock;
