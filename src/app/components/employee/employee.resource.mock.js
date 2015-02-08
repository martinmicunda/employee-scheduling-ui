import employee from './fixtures/employee_1.json!json';
import employees from './fixtures/employees.json!json';

function employeeResourceMock($httpBackend) {
    'use strict';

    $httpBackend.whenGET(/\/employees\/[a-z]*/)
        .respond( (method, url) => {
            console.log('GET',url);
            if(url.includes('employees/1')) {
                return [200, employee];
            }
        });

    $httpBackend.whenGET(/\/employees/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, employees];
        });

    $httpBackend.whenPUT(/\/employees/)
        .respond( (method, url, data) => {
            console.log('PUT',url);
            var dataJSON = JSON.parse(data);
            if(dataJSON.firstName === '503') {
                return [503, dataJSON];
            } else if(dataJSON.firstName === '409') {
                return [409, dataJSON];
            }

            // increment version number to fake real system
            dataJSON.version++;

            return [200, dataJSON];
        });

    $httpBackend.whenDELETE(/\/employees/)
        .respond( (method, url) => { // data
            console.log('DELETE',url);
            //var dataJSON = JSON.parse(data);
            //if(dataJSON.firstName[0].Value === '503') {
            //    return [503, dataJSON];
            //} else if(dataJSON.firstName[0].Value === '409') {
            //    return [409, dataJSON];
            //}

            return [200, {}];
        });
}
employeeResourceMock.$inject = ['$httpBackend'];

export default employeeResourceMock;


