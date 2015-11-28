/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.availability.add', {
    url: '/add',
    onEnter: ['$modal', 'ModalService', ($modal, ModalService) => {
        $modal.open({
            template: '<modal-availability></modal-availability>',
            controller: AvailabilityAdd,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['AvailabilityModel', 'localStorageService', (AvailabilityModel, localStorageService) => AvailabilityModel.setItem(localStorageService.get('availability'))]
            }
        }).result.finally(ModalService.onFinal('app.availability'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class AvailabilityAdd {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default AvailabilityAdd;
