/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import URI from 'urijs';
import moment from 'moment';
import availabilities from './fixtures/availabilities';
import {HEADER_API_VERSION, AVAILABILITY_DATE_FORMAT} from '../../constants/constants';
import {Run, Inject} from '../../../ng-decorators'; // jshint unused: false

class AvailabilityResourceMock {
    //start-non-standard
    @Run()
    @Inject('$httpBackend', 'localStorageService')
    //end-non-standard
    runFactory($httpBackend, localStorageService){
        const key = 'availability';
        const errorField = 'note';
        const patternBase = new RegExp(`\/availabilities`);
        const patternLocalStorage = new RegExp(`${key}_(\\d+|[a-z]*)`);

        availabilities.forEach(data => {
            localStorageService.set(`${key}_${data.id}`, data);
        });

        $httpBackend.whenPOST(patternBase)
            .respond( (method, url, data, headers) => {
                console.log('POST',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                data = JSON.parse(data);

                if(data[errorField] === '500') {
                    return [500];
                }

                const dateRangeLength = moment(data.end, AVAILABILITY_DATE_FORMAT).diff(moment(data.start, AVAILABILITY_DATE_FORMAT), 'days');
                const startDate = moment(data.start, AVAILABILITY_DATE_FORMAT); // make `availability.start` object immutable for add function

                // delete `start` and `end` date as it should not exist in the back end
                delete data.end;
                delete data.start;

                for(let i = 0; i < dateRangeLength; i++) {
                    // moment(startDate) makes `this.availability.start` object immutable for add function
                    data.date = i ? moment(startDate).add(i, 'day').format('YYYYMMDD') : startDate.format('YYYYMMDD');
                    data.id = `${data.employeeId}::${data.date}`;

                    localStorageService.set(`${key}_${data.id}`, data);
                }

                return [204];
            });

        $httpBackend.whenGET(patternBase)
            .respond( (method, url, data, headers) => {
                console.log('GET',url);
                headers['Content-Type'] = HEADER_API_VERSION;
                const result = URI.parse(url);
                const queryString = URI.parseQuery(result.query);
                const dataListLocal = localStorageService.findLocalStorageItems(new RegExp(queryString.employeeId ? `${key}_${queryString.employeeId}::*` : `${key}_*`));

                return [200, dataListLocal];
            });
    }
}
