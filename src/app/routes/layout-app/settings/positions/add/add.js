/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.settings.positions.add', {
    url: '/add',
    onEnter: ['$modal', 'ModalService', ($modal, ModalService) => {
        $modal.open({
            template: '<modal-position></modal-position>',
            controller: PositionAdd,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['PositionModel', (PositionModel) => PositionModel.initItem()]
            }
        }).result.finally(ModalService.onFinal('app.settings.positions'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class PositionAdd {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default PositionAdd;
