'use strict';

import languages from './fixtures/languages.json!json';

function languageResourceMock($httpBackend) {
    'ngInject';

    $httpBackend.whenGET(/\/languages/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, languages];
        });
}

export default languageResourceMock;
