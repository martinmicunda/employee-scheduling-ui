/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.message', {
    url: '/:id/message',
    onEnter: ['$stateParams', '$modal', 'ModalService', ($stateParams, $modal, ModalService) => {
        const id = $stateParams.id;
        $modal.open({
            template: '<modal-message></modal-message>',
            controller: EmployeeMessage,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['EmployeeModel', EmployeeModel => EmployeeModel.initItem(id)]
            }
        }).result.then(ModalService.onSuccess(), ModalService.onError($modal, 'app.employees')).finally(ModalService.onFinal('app.employees'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class EmployeeMessage {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default EmployeeMessage;
