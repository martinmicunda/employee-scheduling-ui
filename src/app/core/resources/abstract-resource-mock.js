/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

class AbstractResourceMock {
    init($httpBackend, localStorageService, route, mockData, mockListData, errorField){
        const patternBase = new RegExp(`\/${route}`);
        const patternGet = new RegExp(`\/${route}\/[a-z]*`);
        const patternId = new RegExp(`\/${route}\/(\\d+|[a-z]*)`);
        const key = route.slice(0, -1);

        mockListData.forEach(function (data) {
            localStorageService.set(`${key}_${data.id}`, data);
        });

        $httpBackend.whenGET(patternGet)
            .respond( (method, url) => {
                console.log('GET',url);
                const id = url.match(patternId)[1];
                const dataLocal = localStorageService.get(`${key}_${id}`);

                if(id === '404') {
                    return [404];
                } else if(id === '500') {
                    return [500];
                }

                return [200, dataLocal ? dataLocal : mockData];
            });

        $httpBackend.whenGET(patternBase)
            .respond( (method, url) => {
                console.log('GET',url);
                const dataListLocal = localStorageService.findLocalStorageItems(patternId);

                return [200, dataListLocal.length > 0 ? dataListLocal : mockListData];
            });

        $httpBackend.whenPOST(patternBase)
            .respond( (method, url, data) => {
                console.log('POST',url);
                data = JSON.parse(data);

                if(data[errorField] === '500') {
                    return [500];
                } else if(data[errorField] === '409') {
                    return [409];
                }

                data.id = Math.floor(Date.now() / 1000);
                localStorageService.set(`${key}_${data.id}`, data);

                return [201, {id: data.id}];
            });

        $httpBackend.whenPUT(patternBase)
            .respond( (method, url, data) => {
                console.log('PUT',url);
                data = JSON.parse(data);

                if(data[errorField] === '404') {
                    return [404];
                } else if(data[errorField] === '409') {
                    return [409];
                } else if(data[errorField] === '500') {
                    return [500];
                }

                localStorageService.set(`${key}_${data.id}`, data);

                return [200, data];
            });

        $httpBackend.whenDELETE(patternBase)
            .respond( (method, url) => {
                console.log('DELETE',url);
                const id = url.match(patternId)[1];

                if(id === '404') {
                    return [404];
                } else if(id === '500') {
                    return [500];
                }

                localStorageService.remove(`${key}_${id}`);

                return [204];
            });
    }
}

export default AbstractResourceMock;
