/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import moment from 'moment';
import template from './modal-availability.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-availability'
})
@View({
    template: template
})
@Inject('ModalModel', 'AvailabilityModel', 'FormService', 'AvailabilityService')
//end-non-standard
class AvailabilityModal {
    constructor(ModalModel, AvailabilityModel, FormService, AvailabilityService) {
        this.modal = ModalModel.getItem();
        this.availability = AvailabilityModel.getItem();
        this.repeatTypes = [{id: '', label: 'Never'}, {id: 'weekly', label: 'Weekly'}];
        this.availability.repeatType = this.availability.repeatType || this.repeatTypes[0].id;
        this.endDate = moment(this.availability.end).subtract(1, 'day').format('ddd, D MMMM');
        this.showEndDate = moment(this.availability.end).diff(moment(this.availability.start), 'days') > 1;
        this.days = AvailabilityService.getCalendarDays();
        this.dateOptions = AvailabilityService.getDatepickerOptions();
        this.result = null;
        this.isSubmitting = null;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
        this.FormService = FormService;
        this.AvailabilityModel = AvailabilityModel;
        this.AvailabilityService = AvailabilityService;
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        //this.availability = this.this.AvailabilityService.removeAdditionalAttributes(this.availability); TODO: only when id exist and all logic should be in service
        return this.FormService.save(this.AvailabilityModel, this.availability, this, form)
            .then(() => this.AvailabilityService.refreshCalendarData());
    }

    open($event) {
        $event.preventDefault();
        $event.stopPropagation();

        this.opened = true;
    }

    delete(availability) {
        return this.FormService.delete(this.AvailabilityModel, availability, this)
            .then(() => this.AvailabilityService.refreshCalendarData());
    }
}

export default AvailabilityModal;
