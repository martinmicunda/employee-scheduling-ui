/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.partners.add', {
    url: '/add',
    onEnter: ['$modal', 'ModalService', ($modal, ModalService) => {
        $modal.open({
            template: '<modal-partner></modal-partner>',
            controller: PartnerAdd,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['PartnerModel', (PartnerModel) => PartnerModel.initItem()]
            }
        }).result.finally(ModalService.onFinal('app.partners'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class PartnerAdd {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default PartnerAdd;
