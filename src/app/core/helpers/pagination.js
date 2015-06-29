/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Filter} from '../../ng-decorator'; // jshint unused: false

//start-non-standard
@Filter({
    filterName: 'startFrom'
})
//end-non-standard
class StartFromFilter {
    startFromFilter() {
        return (input, start) => {
            start = +start; //parse to int
            return input.slice(start);
        };
    }

    static filterFactory(){
        StartFromFilter.instance = new StartFromFilter();
        return StartFromFilter.instance.startFromFilter();
    }
}
