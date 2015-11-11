/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {EMPLOYEE_PROFILE_STATUSES} from '../../core/constants/constants';
import template from './modal-location.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-location'
})
@View({
    template: template
})
@Inject('ModalModel', 'LocationModel', 'FormService')
//end-non-standard
class LocationModal {
    constructor(ModalModel, LocationModel, FormService) {
        this.modal = ModalModel.getItem();
        this.location = LocationModel.getItem();
        this.statusTypes = [EMPLOYEE_PROFILE_STATUSES.ACTIVE, EMPLOYEE_PROFILE_STATUSES.INACTIVE];
        this.location.status = this.location.status || this.statusTypes[0];
        this.location.default = this.location.default || false;
        // it should only display default options when location.id exist and location.default is set to true
        this.displayDefaultOptions = this.location.id && !this.location.default;
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.LocationModel = LocationModel;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;

        if(this.displayDefaultOptions && this.location.default) {
            let defaultLocation = this.LocationModel.getDefaultLocation();
            defaultLocation.default = false;
            this.location.status = EMPLOYEE_PROFILE_STATUSES.ACTIVE;
            return this.LocationModel.save(this.location).then(() => {
                this.FormService.save(this.LocationModel, defaultLocation, this, form);
            }, (response) => {
                this.FormService.onFailure(this, response);
            });
        } else {
            if(this.LocationModel.getCollection().length === 0) {
                this.location.default = true;
            }
            return this.FormService.save(this.LocationModel, this.location, this, form);
        }
    }
}

export default LocationModal;
