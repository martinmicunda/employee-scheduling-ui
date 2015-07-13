/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Filter} from '../../ng-decorators'; // jshint unused: false

class PaginationFilters {
    //start-non-standard
    @Filter({
        filterName: 'startFrom'
    })
    //end-non-standard
    static startFromFilter() {
        return (input, start) => {
            start = +start; //parse to int
            return input.slice(start);
        };
    }
}
