/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.documents.edit', {
    url: '/:id/edit',
    onEnter: ['$stateParams', '$modal', 'ModalService', ($stateParams, $modal, ModalService) => {
        const id = $stateParams.id;
        $modal.open({
            template: '<modal-document></modal-document>',
            controller: DocumentEdit,
            controllerAs: 'vm',
            size: 'md',
            resolve: {
                init: ['DocumentModel', 'EmployeeModel', (DocumentModel, EmployeeModel) => Promise.all([DocumentModel.initItem(id), EmployeeModel.initCollection()])]
            }
        }).result.then(ModalService.onSuccess(), ModalService.onError($modal, 'app.documents')).finally(ModalService.onFinal('app.documents'));
    }]
})
@Inject('$modalInstance', 'ModalModel')
//end-non-standard
class DocumentEdit {
    constructor($modalInstance, ModalModel) {
        ModalModel.setItem($modalInstance);
    }
}

export default DocumentEdit;
