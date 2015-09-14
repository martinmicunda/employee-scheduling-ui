/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './schedule.html!text';
import {RouteConfig, Inject} from '../../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.employees.schedule', {
    url: '/:id/schedule',
    onEnter: ['$stateParams', '$modal', 'ModalService', function($stateParams, $modal, ModalService) {
        //var id = $stateParams.id;
        $modal.open({
            template: template,
            resolve: {/* @ngInject */
                //employee: function(EmployeeResource) {
                //    return EmployeeResource.get(id);
                //}
            },
            controller: EmployeeSchedule,
            controllerAs: 'vm',
            size: 'md'
        }).result.finally(ModalService.onFinal('app.employees'));
    }]
})
@Inject('$modalInstance')
//end-non-standard
class EmployeeSchedule {
    constructor($modalInstance) {
        this.modal = $modalInstance;
    }

    cancel() {
        this.modal.dismiss('cancel');
    }
}

export default EmployeeSchedule;
