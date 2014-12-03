//import employee from './fixtures/employee_1.json!json';

function employeeResourceMock($httpBackend) {
    'use strict';

    $httpBackend.whenGET(/\/employees\/[a-z]*/)
        .respond( (method, url) => {
            console.log('GET',url);
            var request = new XMLHttpRequest();
            if(url.contains('employees/1')) { // contains should be changed to includes
                request.open('GET', 'app/components/employee/fixtures/employee_1.json', false);
                request.send(null);
                return [200, request.response];
            }
        });

    $httpBackend.whenPUT(/\/employees/)
        .respond( (method, url, data) => {
            console.log('url PUT',url);
            //var dataJSON = JSON.parse(data);
            //if(dataJSON.names[0].Value === '503') {
            //    return [503, dataJSON];
            //} else if(dataJSON.names[0].Value === '409') {
            //    return [409, dataJSON];
            //}

            return [200, data];
        });
}

export default employeeResourceMock;


