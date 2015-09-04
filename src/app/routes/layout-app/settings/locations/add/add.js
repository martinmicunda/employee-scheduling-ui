/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.locations.add', {
    url: '/add',
    onEnter: ['$modal', 'ModalService', ($modal, ModalService) => {
        $modal.open({
            template: '<modal-location></modal-location>',
            controller: LocationAdd,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['LocationModel', (LocationModel) => LocationModel.initItem()]
            }
        }).result.finally(ModalService.onFinal('app.settings.locations'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class LocationAdd {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default LocationAdd;
