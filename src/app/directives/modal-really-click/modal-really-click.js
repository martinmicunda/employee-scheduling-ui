/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Inject('$modalInstance')
//end-non-standard
class MmModalReallyClickController {
    constructor($modalInstance) {
        this.modal = $modalInstance;
    }

    ok() {
        this.modal.close();
    }

    cancel() {
        this.modal.dismiss('cancel');
    }
}

const MODAL = new WeakMap();
//start-non-standard
@Directive({
    selector: 'mm-modal-really-click'
})
//end-non-standard
class MmModalReallyClick {
    constructor($modal) {
        this.restrict = 'A';
        this.scope = {
            mmModalReallyClick: '&'
        };
        MODAL.set(this, $modal);
    }

    link(scope, element, attrs) {
        element.bind('click', () => {
            const modalInstance = MODAL.get(MmModalReallyClick.instance).open({
                template: `
                    <div class="modal-header">
                        <button type="button" class="close" ng-click="vm.cancel()">×</button>
                        <h4 class="modal-title">${attrs.mmReallyHeader}</h4>
                    </div>
                    <div class="modal-body">
                        <p>${attrs.mmReallyMessage}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white" ng-click="vm.cancel()">Cancel</button>
                        <button class="btn btn-sm btn-success" ng-click="vm.ok()">OK</button>
                    </div>
                `,
                controller: MmModalReallyClickController,
                controllerAs: 'vm'
            });

            modalInstance.result.then( () => scope.mmModalReallyClick() );
        });
    }

    //start-non-standard
    @Inject('$modal')
    //end-non-standard
    static directiveFactory($modal){
        MmModalReallyClick.instance = new MmModalReallyClick($modal);
        return MmModalReallyClick.instance;
    }
}

export {MmModalReallyClick, MmModalReallyClickController};
