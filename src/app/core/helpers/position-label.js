/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Filter} from '../../ng-decorators'; // jshint unused: false

class StatusLabel {
    //start-non-standard
    @Filter({
        filterName: 'positionLabel'
    })
    //end-non-standard
    static positionLabelFilter() {
        return (positionId, positions) => {
            if(!Array.isArray(positions)) {
                positions = positions.data;
            }
            const position = positions.find(position => position.id === positionId);

            return position ? position.name : '';
        };
    }
}
