/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Component, View} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'error-modal'
})
@View({
    template: `
        <div class="modal-header">
            <button type="button" class="close" ng-click="vm.cancel()">×</button>
            <h4 class="modal-title">Error</h4>
        </div>
        <div class="modal-body form-wizard">
            <div class="alert alert-danger mb0">
                <h4 class="mb0 display-inline-block"><i class="fa fa-exclamation-circle"></i>&nbsp;Error!</h4>
                <p class="display-inline">&nbsp;{{vm.errorMessage}}</p>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" ng-click="vm.cancel()" class="btn btn-sm btn-white">Close</button>
        </div>
    `,
    bindToController: {
        cancel: '&',
        error: '='
    }
})
//end-non-standard
class ErrorModal {
    constructor() {
        if(this.error.status === 404) {
            this.errorMessage = 'The requested record could not be found.';
        } else {
            this.errorMessage = 'An error occurred while processing your request. Please try again.';
        }
    }
}
