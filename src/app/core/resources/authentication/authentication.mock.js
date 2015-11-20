/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import employees from '../employee/fixtures/employees.json!json';
import {HEADER_API_VERSION, EMPLOYEE_PROFILE_STATUSES} from '../../constants/constants';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class AuthenticationResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', '$window')
    //end-non-standard
    static runFactory($httpBackend, $window){
        $httpBackend.whenPOST(/\/login/)
            .respond( (method, url, data, headers) => {
                console.log('POST',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                data = JSON.parse(data);
                data = $window.atob(data.credentials);
                data = JSON.parse(data);

                const employee = employees.find((employee) => employee.email === data.email && (employee.status !== EMPLOYEE_PROFILE_STATUSES.INACTIVE || employee.status !== EMPLOYEE_PROFILE_STATUSES.PENDING));

                if(!employee || data.password !== 'password') {
                    return [401];
                } else if (data.email === '500@error.com') {
                    return [500];
                }

                const tokenHeader = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
                const tokenPayload = $window.btoa(JSON.stringify({id: employee.id, firstName: employee.firstName, lastName: employee.lastName, role: employee.role, avatar: employee.avatar}));
                const tokenSignature = 'TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

                const token = `${tokenHeader}.${tokenPayload}.${tokenSignature}`;
                return [200, {token: token}];
            });

        $httpBackend.whenGET(/\/logout/)
            .respond( (method, url, data, headers) => {
                console.log('GET',url);
                headers['Content-Type'] = HEADER_API_VERSION;

                return [200, {}];
            });

        $httpBackend.whenPOST(/\/forgot/)
            .respond( (method, url, data, headers) => {
                console.log('POST',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                data = JSON.parse(data);

                if (data.email.includes('500')) {
                    return [500];
                }

                return [200];
            });

        $httpBackend.whenPOST(/\/password\/(\\d+|[a-z]*)/)
            .respond( (method, url, data, headers) => {
                console.log('POST',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                data = $window.atob(data);
                data = JSON.parse(data);

                if(data.password.includes('400')) {
                    return [400];
                } else if (data.password.includes('404')) {
                    return [404];
                } else if (data.password.includes('500')) {
                    return [500];
                }

                return [200];
            });

        $httpBackend.whenPUT(/\/password\/(\\d+|[a-z]*)/)
            .respond( (method, url, data, headers) => {
                console.log('PUT',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                data = $window.atob(data);
                data = JSON.parse(data);

                if(data.currentPassword.includes('400')) {
                    return [400];
                } else if (data.currentPassword.includes('404')) {
                    return [404];
                } else if (data.currentPassword.includes('409')) {
                    return [409];
                } else if (data.currentPassword.includes('500')) {
                    return [500];
                }

                return [200];
            });
    }
}
