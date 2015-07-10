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
    onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
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
        }).result.finally(function() {
                $state.go('app.employees');
            });
    }]
})
@Inject('$modalInstance')
//end-non-standard
class EmployeeSchedule {
    constructor($modalInstance) {
        this.$modalInstance = $modalInstance;
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }
}

