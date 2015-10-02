/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './employee-account-details.html!text';
import {EMPLOYEE_PROFILE_STATUSES, USER_ROLES} from '../../core/constants/constants';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'employee-account-details'
})
@View({
    template: template
})
@Inject('EmployeeModel', 'PositionModel', 'SettingModel', 'Upload', 'LocationModel')
//end-non-standard
class EmployeeAccountDetails {
    constructor(EmployeeModel, PositionModel, SettingModel, Upload, LocationModel) {
        this.statusPending = EMPLOYEE_PROFILE_STATUSES.PENDING;
        this.statuses = [EMPLOYEE_PROFILE_STATUSES.ACTIVE, EMPLOYEE_PROFILE_STATUSES.INACTIVE];
        this.employee = EmployeeModel.getItem();
        this.positions = PositionModel.getCollection();
        this.employee.language = this.employee.language || SettingModel.getItem().language;
        this.employee.avatar = this.employee.avatar || SettingModel.getItem().avatar;
        this.employee.status = this.employee.status || EMPLOYEE_PROFILE_STATUSES.PENDING;
        this.employee.role = this.employee.role || USER_ROLES.EMPLOYEE;
        this.employee.locations = this.employee.locations || [LocationModel.getCollection().find(location => location.default).id];
        this.Upload = Upload;
        this.SettingModel = SettingModel;
    }

    removeAvatar() {
        this.employee.avatar = this.SettingModel.getItem().avatar;
    }

    addAvatar(file) {
        const disallowObjectUrl = true;
        return this.Upload.dataUrl(file, disallowObjectUrl).then(url => this.employee.avatar = url);
    }
}

export default EmployeeAccountDetails;
