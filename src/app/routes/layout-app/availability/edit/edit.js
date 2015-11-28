/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.availability.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$modal', 'ModalService', ($stateParams, $modal, ModalService) => {
        const id = $stateParams.id;
        $modal.open({
            template: '<modal-availability></modal-availability>',
            controller: AvailabilityEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['AvailabilityModel', (AvailabilityModel) => AvailabilityModel.setItem(AvailabilityModel.getItemById(id))]
            }
        }).result.finally(ModalService.onFinal('app.availability'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class AvailabilityEdit {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default AvailabilityEdit;
