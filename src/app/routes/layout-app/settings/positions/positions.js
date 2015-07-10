/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './positions.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.positions', {
    url: '/positions',
    template: template,
    resolve: {
        positions: ['PositionResource', PositionResource => PositionResource.getList()]
    }
})
@Inject('positions', 'PositionService')
//end-non-standard
class SettingPositions {
    constructor(positions, PositionService) {
        this.positions = positions;
        PositionService.setPositions(positions);
    }
}
