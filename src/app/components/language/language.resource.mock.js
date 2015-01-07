import languages from './fixtures/languages.json!json';

function languageResourceMock($httpBackend) {
    'use strict';

    $httpBackend.whenGET(/\/languages/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, languages];
        });
}

export default languageResourceMock;
