/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.positions.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$modal', 'ModalService', ($stateParams, $modal, ModalService) => {
        const id = $stateParams.id;
        $modal.open({
            template: '<modal-position></modal-position>',
            controller: PositionEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['PositionModel', (PositionModel) => PositionModel.initItem(id)]
            }
        }).result.then(ModalService.onSuccess(), ModalService.onError($modal, 'app.settings.positions')).finally(ModalService.onFinal('app.settings.positions'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class PositionEdit {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default PositionEdit;
