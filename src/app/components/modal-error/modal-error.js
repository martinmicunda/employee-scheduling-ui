/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './modal-error.html!text';
import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Directive({
    selector: 'mm-error-modal'
})
//end-non-standard
class MmErrorModal {
    constructor() {
        this.template = template;
        this.restrict = 'EA';
        this.scope = {
            cancel: '&',
            error: '='
        };
    }

    link(scope) {
        if(scope.error.status === 404) {
            scope.errorMessage = 'The requested record could not be found.';
        } else {
            scope.errorMessage = 'An error occurred while processing your request. Please try again.';
        }
    }

    static directiveFactory(){
        MmErrorModal.instance = new MmErrorModal();
        return MmErrorModal.instance;
    }
}
