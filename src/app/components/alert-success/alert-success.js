/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {View, Component} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'alert-success'
})
@View({
    template: `
        <div ng-if="vm.hasSuccess" class="row">
            <div class="col-md-12 col-sm-12">
                <div class="alert alert-success animated fadeIn">
                    <strong>Success!</strong>
                    <span>{{vm.successMessage}}</span>
                    <span class="close" data-dismiss="alert" ng-click="vm.hasSuccess=false">×</span>
                </div>
            </div>
        </div>
    `,
    bindToController: {
        hasSuccess: '=',
        successMessage: '='
    }
})
//end-non-standard
class AlertSuccess {}
