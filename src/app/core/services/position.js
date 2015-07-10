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
@Inject('Restangular')
//end-non-standard
class PositionService {
    constructor(Restangular) {
        this.positions = [];
        this.Restangular = Restangular;
    }

    getPositions() {
        return this.positions;
    }

    setPositions(positions) {
        positions = this.Restangular.stripRestangular(positions);
        this.positions = positions;
    }

    addPosition(position) {
        this.positions.push(position);
    }

    updatePosition(position) {
        for (let i = 0; i < this.positions.length; i++) {
            if(this.positions[i].id === position.id) {
                this.positions[i] = this.Restangular.stripRestangular(position);
            }
        }
        //const replace = Object.assign(this.positions);
        //this.positions = [];
        //this.positions = replace;
        //console.log(this.positions);
    }
}

