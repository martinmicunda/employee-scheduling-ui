import positionsEN from './fixtures/positions_en.json!json';
import positionsSK from './fixtures/positions_sk.json!json';

function positionResourceMock($httpBackend) {
    'use strict';

    $httpBackend.whenGET(/\/positions\?lang*/)
        .respond( (method, url) => {
            console.log('GET',url);
            if(url.includes('lang=en')) {
                return [200, positionsEN];
            } else if(url.contains('lang=sk'))  {
                return [200, positionsSK];
            }
        });
}

export default positionResourceMock;
