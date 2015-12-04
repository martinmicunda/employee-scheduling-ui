///**
// * @author    Martin Micunda {@link http://martinmicunda.com}
// * @copyright Copyright (c) 2015, Martin Micunda
// * @license   GPL-3.0
// */
//'use strict';
//
//import moment from 'moment';
//import template from './modal-availability.html!text';
//import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false
//
////start-non-standard
//@Component({
//    selector: 'modal-availability'
//})
//@View({
//    template: template
//})
//@Inject('ModalModel', 'AvailabilityModel', 'FormService', 'AvailabilityService')
////end-non-standard
//class AvailabilityModal {
//    constructor(ModalModel, AvailabilityModel, FormService, AvailabilityService) {
//        this.modal = ModalModel.getItem();
//        this.availability = AvailabilityModel.getItem();
//        this.repeatTypes = [{id: '', label: 'Never'}, {id: 'DAILY', label: 'Daily'}, {id: 'WEEKLY', label: 'Weekly'}];
//        if(!this.availability.recurrence) {
//            this.availability.recurrence = {freq: this.repeatTypes[0].id, weekdays: []};
//        }
//        this.endDate = moment(this.availability.end).subtract(1, 'day').format('ddd, D MMMM');
//        this.showEndDate = moment(this.availability.end).diff(moment(this.availability.start), 'days') > 1;
//        this.weekdays = AvailabilityService.getCalendarWeedays();
//        this.dateOptions = AvailabilityService.getDatepickerOptions();
//        this.showDeleteButton = this.availability.id; // stop blinking delete button when user a create new availability
//        this.result = null;
//        this.isSubmitting = null;
//        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
//        this.FormService = FormService;
//        this.AvailabilityModel = AvailabilityModel;
//        this.AvailabilityService = AvailabilityService;
//    }
//
//    cancel() {
//        this.modal.dismiss('cancel');
//    }
//
//    save(form) {
//        if(!form.$valid) {return;}
//        this.isSubmitting = true;
//
//        // push name of days to weekdays array
//        if(this.availability.recurrence.freq === this.repeatTypes[2].id) {
//            const end = moment(this.availability.end);
//            const daysDiff = end.diff(moment(this.availability.start), 'days');
//
//            for(let i = 0; i < daysDiff; i++) {
//                const weekday = moment(this.availability.start).add('days', i);
//                this.availability.recurrence.weekdays.push(moment(weekday).format('dd').toUpperCase());
//            }
//        }
//
//        if(this.availability.recurrence.freq === this.repeatTypes[0].id) {
//            delete this.availability.recurrence;
//        }
//        // else if(this.availability.recurrence.freq !== this.repeatTypes[2].id) {
//        //    delete this.availability.recurrence.weekdays;
//        //}
//
//        return this.FormService.save(this.AvailabilityModel, this.availability, this, form)
//            .then(() => this.AvailabilityService.refreshCalendarData(), () => {
//                if(!this.availability.recurrence.freq) {
//                    this.availability.recurrence = {freq: this.repeatTypes[0].id, weekdays: []};
//                }
//            });
//    }
//
//    open($event) {
//        $event.preventDefault();
//        $event.stopPropagation();
//
//        this.opened = true;
//    }
//
//    delete(availability) {
//        return this.FormService.delete(this.AvailabilityModel, availability, this)
//            .then(() => this.AvailabilityService.refreshCalendarData());
//    }
//
//    toggleWeekdaySelection(weekday) {
//        const idx = this.availability.recurrence.weekdays.indexOf(weekday);
//
//        // is currently selected
//        if (idx > -1) {
//            this.availability.recurrence.weekdays.splice(idx, 1);
//        } else { // is newly selected
//            this.availability.recurrence.weekdays.push(weekday);
//        }
//    }
//}
//
//export default AvailabilityModal;
