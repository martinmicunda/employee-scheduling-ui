//import employee from './fixtures/languages.json!json';

function roleResourceMock($httpBackend) {
    'use strict';

    $httpBackend.whenGET(/\/roles\?lang*/)
        .respond( (method, url) => {
            console.log('GET',url);
            var request = new XMLHttpRequest();
            if(url.contains('lang=en')) {
                request.open('GET', 'app/components/role/fixtures/roles_en.json', false);
                request.send(null);
                return [200, request.response];
            } else if(url.contains('lang=sk'))  {
                request.open('GET', 'app/components/role/fixtures/roles_sk.json', false);
                request.send(null);
                return [200, request.response];
            }
        });
}

export default roleResourceMock;
