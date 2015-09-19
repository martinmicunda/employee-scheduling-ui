/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'profile-completeness-bar'
})
@View({
    template: `
        <div class="progress progress-xs mb5">
            <div class="progress-bar"
                 ng-class="{'progress-bar-success': vm.profileCompleteness.percentage >= 70, 'progress-bar-warning': vm.profileCompleteness.percentage < 70 && vm.profileCompleteness.percentage >= 40, 'progress-bar-danger': vm.profileCompleteness.percentage < 40}"
                 ng-style="{'width': vm.profileCompleteness.percentage + '%'}"></div>
        </div>
        <p class="text-muted clearfix">
            <span class="pull-left">Profile completeness</span>
            <span class="pull-right">{{vm.profileCompleteness.percentage}}%</span>
        </p>
    `
})
@Inject('EmployeeModel')
//end-non-standard
class ProfileCompletenessBar {
    constructor(EmployeeModel) {
        this.profileCompleteness = EmployeeModel.getProfileCompleteness();
    }
}

export default ProfileCompletenessBar;
