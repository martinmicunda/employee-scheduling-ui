/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import './add/add.js';
import './edit/edit.js';
import template from './positions.html!text';
import {RouteConfig, Component, View, Inject} from '../../../../ng-decorators.js'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.positions', {
    url: '/positions',
    template: '<positions></positions>',
    resolve: {
        init: ['PositionModel', PositionModel => PositionModel.initCollection()]
    }
})
@Component({
    selector: 'positions'
})
@View({
    template: template
})
@Inject('FormService', 'PositionModel')
//end-non-standard
class Positions {
    constructor(FormService, PositionModel) {
        this.positions = PositionModel.getCollection();
        this.FormService = FormService;
        this.PositionModel = PositionModel;
    }

    deletePosition(position) {
        this.FormService.delete(this.PositionModel, position, this);
    }
}

export default Positions;
