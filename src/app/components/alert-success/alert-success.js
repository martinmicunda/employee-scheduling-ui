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
                    <h4 class="mb0 display-inline-block"><i class="fa fa-check-circle"></i>&nbsp;Success!</h4>
                    <p class="display-inline">&nbsp;{{vm.successMessage}}</p>
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
