/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import moment from 'moment';
import template from './modal-availability.html!text';
import {AVAILABILITY_DATE_FORMAT} from '../../core/constants/constants';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-availability'
})
@View({
    template: template
})
@Inject('ModalModel', 'AvailabilityModel', 'FormService', 'AvailabilityService', 'AvailabilityResource')
//end-non-standard
class AvailabilityModal {
    constructor(ModalModel, AvailabilityModel, FormService, AvailabilityService, AvailabilityResource) {
        this.modal = ModalModel.getItem();
        this.availability = AvailabilityModel.getItem();
        this.startDate = this.availability.start.format('ddd, D MMMM');
        this.dateRangeLength = this.availability.end.diff(this.availability.start, 'days');
        if(this.dateRangeLength > 1) {
            const endDate = moment(this.availability.end); // make `this.availability.end` object immutable for subtract function
            this.endDate = endDate.subtract(1, 'day').format('ddd, D MMMM');
        }
        this.result = null;
        this.isSubmitting = null;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
        this.FormService = FormService;
        this.AvailabilityModel = AvailabilityModel;
        this.AvailabilityService = AvailabilityService;
        this.AvailabilityResource = AvailabilityResource;
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;

        // we are only passing date range (start and end) to save network bandwidth instead of passing
        // array of availabilities (back end will take care of creating multiple availabilities if the date range is more than one day)
        const availability = {availability: this.availability.availability, start: this.availability.start.format(AVAILABILITY_DATE_FORMAT), end: this.availability.end.format(AVAILABILITY_DATE_FORMAT), employeeId: this.availability.employeeId};
        if(this.availability.note) {
            availability.note = this.availability.note;
        }
        return this.AvailabilityResource.create(availability).then(() => {
            this.AvailabilityService.createOrReplaceAvailabilities(this.dateRangeLength, this.availability);
            form.$setPristine();
            this.FormService.onSuccess(this);
        }, response => {
            form.$setPristine();
            this.FormService.onFailure(this, response);
        });
    }
}

export default AvailabilityModal;
