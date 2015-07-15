/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'PositionService'
})
//end-non-standard
class PositionService {
    constructor() {
        this.positions = [];
    }

    getPositions() {
        return this.positions;
    }

    setPositions(positions) {
        this.positions = positions;
    }

    addPosition(position) {
        this.positions.push(position);
    }

    updatePosition(position) {
        for (let i = 0; i < this.positions.length; i++) {
            if(this.positions[i].id === position.id) {
                this.positions[i] = position;
            }
        }
    }
}

