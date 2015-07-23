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
@Inject('positions', 'PositionResource', 'PositionService', 'FormService')
//end-non-standard
class SettingPositions {
    constructor(positions, PositionResource, PositionService, FormService) {
        PositionService.setList(positions);
        this.positions = PositionService.getList();
        this.FormService = FormService;
        this.PositionResource = PositionResource;
    }

    deletePosition(position) {
        this.PositionResource.delete(position.id).then(() => {
            this.positions.splice(this.positions.indexOf(position), 1);
            this.FormService.success(this);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
