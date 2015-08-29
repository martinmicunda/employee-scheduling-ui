/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'ModalService'
})
@Inject('$state')
//end-non-standard
class ModalService {
    constructor($state) {
        this.route = $state;
    }

    onSuccess() {
        return () => {};
    }

    onError($modal, state) {
        return (error) => {
            if(error.status) {
                $modal.open({
                    template: '<error-modal cancel="vm.cancel()" error="vm.error"></error-modal>',
                    controller: ['$modalInstance', function ($modalInstance) {
                        var vm = this;
                        vm.error = error;
                        vm.cancel = () => $modalInstance.dismiss('cancel');
                    }],
                    controllerAs: 'vm',
                    size: 'md'
                }).result.finally(() => this.route.go(state));
            }
        };
    }

    onFinal(state) {
        return () => this.route.go(state);
    }
}

export default ModalService;
