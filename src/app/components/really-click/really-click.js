/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive, Inject} from '../../ng-decorator'; // jshint unused: false

const MODAL = new WeakMap();
//start-non-standard
@Directive({
    selector: 'mm-really-click'
})
//end-non-standard
class MmReallyClick {
    constructor($modal) {
        this.restrict = 'EA';
        this.scope = {
            mmReallyClick: '&'
        };
        MODAL.set(this, $modal);
    }

    link(scope, element) {
        element.bind('click', () => {
            const modalInstance = MODAL.get(MmReallyClick.instance).open({
                templateUrl: 'deleteModal.html',
                controller: ['$modalInstance', function($modalInstance) {
                    const vm = this;

                    vm.ok = () => $modalInstance.close();

                    vm.cancel = () => $modalInstance.dismiss('cancel');
                }],
                controllerAs: 'vm'
            });

            modalInstance.result.then( () => scope.mmReallyClick() );
        });
    }

    //start-non-standard
    @Inject('$modal')
    //end-non-standard
    static directiveFactory($modal){
        MmReallyClick.instance = new MmReallyClick($modal);
        return MmReallyClick.instance;
    }
}

