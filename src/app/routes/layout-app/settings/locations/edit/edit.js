/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.locations.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$modal', 'ModalService', ($stateParams, $modal, ModalService) => {
        const id = $stateParams.id;
        $modal.open({
            template: '<modal-location></modal-location>',
            controller: LocationEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['LocationModel', (LocationModel) => LocationModel.initItem(id)]
            }
        }).result.then(ModalService.onSuccess(), ModalService.onError($modal, 'app.settings.locations')).finally(ModalService.onFinal('app.settings.locations'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class LocationEdit {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default LocationEdit;
