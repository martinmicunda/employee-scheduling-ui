/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents.add', {
    url: '/add',
    onEnter: ['$modal', 'ModalService', ($modal, ModalService) => {
        $modal.open({
            template: '<modal-document></modal-document>',
            controller: DocumentAdd,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['DocumentModel', 'EmployeeModel', (DocumentModel, EmployeeModel) => Promise.all([DocumentModel.initItem(), EmployeeModel.initCollection()])]
            }
        }).result.finally(ModalService.onFinal('app.documents'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class DocumentAdd {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default DocumentAdd;
