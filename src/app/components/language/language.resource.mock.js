//import employee from './fixtures/languages.json!json';

function languageResourceMock($httpBackend) {
    'use strict';

    $httpBackend.whenGET(/\/languages/)
        .respond( (method, url) => {
            console.log('GET',url);
            var request = new XMLHttpRequest();
            request.open('GET', 'app/components/language/fixtures/languages.json', false);
            request.send(null);
            return [200, request.response];
        });
}

export default languageResourceMock;
