/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './employee-authorizations.html!text';
import {EMPLOYEE_PROFILE_STATUSES, USER_ROLES} from '../../core/constants/constants';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'employee-authorizations'
})
@View({
    template: template
})
@Inject('EmployeeModel', 'LocationModel')
//end-non-standard
class EmployeeAuthorizations {
    constructor(EmployeeModel, LocationModel) {
        this.roles = Object.values(USER_ROLES);
        this.employee = EmployeeModel.getItem();
        this.locations = LocationModel.getCollection().filter(location => location.status === EMPLOYEE_PROFILE_STATUSES.ACTIVE);
        this.employee.role = this.employee.role || USER_ROLES.EMPLOYEE;
        this.employee.locations = this.employee.locations || [this.locations.find(location => location.default).id];
        this.employee.supervisorLocations = this.employee.supervisorLocations || [];
    }

    deleteSupervisorLocations() {
        if(this.employee.role !== USER_ROLES.SUPERVISOR) {
            this.employee.supervisorLocations = [];
        }
    }

    selectAll(selectedAll, type) {
        if(selectedAll) {
            this.employee[type] = this.locations.map(location => location.id);
        } else {
            this.employee[type] = [];
        }
    }

    toggleSelection(locationId, selectedAll, type) {
        const idx = this.employee[type].indexOf(locationId);

        // is currently selected
        if (idx > -1) {
            this.employee[type].splice(idx, 1);
        } else { // is newly selected
            this.employee[type].push(locationId);
        }

        selectedAll = this.employee[type].length === this.locations.length;
    }
}

export default EmployeeAuthorizations;
