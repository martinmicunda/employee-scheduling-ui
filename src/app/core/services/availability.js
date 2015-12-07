/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import moment from 'moment';
import {AVAILABILITY_DATE_FORMAT} from '../constants/constants';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'AvailabilityService'
})
@Inject('$timeout', '$compile', '$state', '$modal', '$window', 'localStorageService', 'AvailabilityModel', 'uiCalendarConfig', 'ModalService', 'AuthenticationService', 'FormService', 'EmployeeResource')
//end-non-standard
class AvailabilityService {
    constructor($timeout, $compile, $state, $modal, $window, localStorageService, AvailabilityModel, uiCalendarConfig, ModalService, AuthenticationService, FormService, EmployeeResource) {
        const date = new Date();
        const m = date.getMonth();
        const y = date.getFullYear();
        this.$compile = $compile;
        this.events = [    {
            id: '8',
            note: '',
            start: new Date(y, m, 3),
            end: new Date(y, m, 3),
            allDay: true
        },{
            id: '9',
            note: '',
            start: new Date(y, m, 4),
            end: new Date(y, m, 4),
            allDay: true
        },
            {
                id: '10',
                note: '',
                start: new Date(y, m, 6),
                end: new Date(y, m, 20),
                allDay: true
            }];
        this.router = $state;
        this.modal = $modal;
        this.$window = $window;
        this.ModalService = ModalService;
        this.uiCalendarConfig = uiCalendarConfig;
        this.AvailabilityModel = AvailabilityModel;
        this.localStorageService = localStorageService;
        this.AuthenticationService = AuthenticationService;
        this.$timeout = $timeout;
        this.FormService = FormService;
        this.isLoading = false;
        this.EmployeeResource = EmployeeResource;
    }

    getCalendarConfig(scope, calendarView) {
        let resourcesLength = 1;
        const height = Math.max(600, this.$window.innerHeight - 220);

        const config = {
            contentHeight: 600,
            selectable: true,
            header: {
                left: '',
                center: 'title',
                right: 'today prev,next'
            },
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            firstDay: 1, // start week on Monday
            allDayDefault: true,
            select: (start, end, jsEvent, view, resource) => {
                const resourceId = resource ? resource.id : this.AuthenticationService.getCurrentUser().id;
                let availability = this.AvailabilityModel.getCollection().find(event => moment(start).isSame(event.start, 'day') && (calendarView === 'me' ? true : event.employeeId === resourceId)) || {availability: 'available', employeeId: resourceId};
                availability.start = moment(start);
                availability.end = moment(end);

                this.AvailabilityModel.setItem(Object.assign({}, availability));

                this.modal.open({
                    template: '<modal-availability></modal-availability>',
                    controller: ['$modalInstance', 'ModalModel', ($modalInstance, ModalModel) =>  ModalModel.setItem($modalInstance)],
                    controllerAs: 'vm',
                    size: 'md'
                }).result.finally(this.ModalService.onFinal('app.availability'));
            },
            eventDataTransform: event => {
                event.start = moment(event.date, AVAILABILITY_DATE_FORMAT);
                event.rendering = 'background';
                event.className = 'availability-' + event.availability;
                event.resourceId = event.employeeId;

                return event;
            },
            dayRender: (date, cell) => {
                const eventExists = this.events.find(event => moment(date).isSame(event.start, 'day'));
                if(eventExists) {
                    //for (let i = 0; i < resourcesLength; i++) {
                    //    cell.prepend('<div class="availability-scheduler-event"></div>');
                    //}
                    cell.addClass('availability-event');
                }
            },
            isLoading: () => this.isLoading,
            loading: isLoading => {
                this.isLoading = isLoading;
            }
        };

        const schedulerConfig = {
            contentHeight: 'auto',
            defaultView: 'timelineWeek',
            slotLabelFormat: 'dddd DD/MM',
            slotLabelInterval: '24:00',
            resourceAreaWidth: '20%',
            resourceLabelText: 'Employees',
            resourceOrder: 'firstName,lastName',
            resources: cb => {
                this.EmployeeResource.getList({fields: 'avatar,firstName,lastName'}).then(data => {
                    resourcesLength = data.length;
                    this.FormService.onSuccess(scope);
                    cb(data);
                }, response => this.FormService.onFailure(scope, response)).finally(() => this.isLoading = false);
            },
            resourceText: resource => resource.firstName + ' ' + resource.lastName,
            resourceRender: (resourceObject, dataTds, eventTd) => {
                dataTds.children().children().prepend(`<span><img class="img-circle" title="${resourceObject.firstName} ${resourceObject.lastName}" src="${resourceObject.avatar}"></span>`);
            }
        };

        return calendarView === 'me' ? config : Object.assign({}, config, schedulerConfig);

        //return {
        //    contentHeight: 600,
        //    selectable: true,
        //    editable: true,
        //    header: {
        //        left: '',
        //        center: 'title',
        //        right: 'today prev,next'
        //    },
        //    firstDay: 1, // start week on Monday
        //    allDayDefault: true,
        //    select: (start, end) => {
        //        let availability = this.AvailabilityModel.getCollection().find(event => moment(start).isSame(event.start, 'day')) || {availability: 'available', employeeId: this.AuthenticationService.getCurrentUser().id};
        //        availability.start = moment(start);
        //        availability.end = moment(end);
        //
        //        this.AvailabilityModel.setItem(Object.assign({}, availability));
        //
        //        this.modal.open({
        //            template: '<modal-availability></modal-availability>',
        //            controller: ['$modalInstance', 'ModalModel', ($modalInstance, ModalModel) =>  ModalModel.setItem($modalInstance)],
        //            controllerAs: 'vm',
        //            size: 'md'
        //        }).result.finally(this.ModalService.onFinal('app.availability'));
        //    },
        //    dayRender: (date, cell) => {
        //        const eventExists = this.events.find(event => moment(date).isSame(event.start, 'day'));
        //        if(eventExists) {
        //            cell.addClass('availability-event');
        //            //this.$timeout(() => {
        //            //    cell.append({'tooltip': 'hello!',
        //            //        'tooltip-append-to-body': true}); //{'tooltip-html': "'<b>'"}
        //            //    this.$compile(cell);
        //            //});
        //            //const events = `
        //            //        <p><a hreg="http://google.sk">10:00 - 16:00 Plejsy</a></p>
        //            //        <p><b>14:00 - 18:00 Max</b></p>
        //            //        <p><b>13:00 - 20:00 Siet - Povazska</b></p>
        //            //    `;
        //            //cell.append(events);
        //            //this.$timeout(() => {
        //            //    //cell.attr({'tooltip': 'hello!',
        //            //    //    'tooltip-append-to-body': true}); //{'tooltip-html': "'<b>'"}
        //            //    this.$compile(cell)($scope);
        //            //});
        //        }
        //    },
        //    eventDataTransform: event => {
        //        event.start = moment(event.date, AVAILABILITY_DATE_FORMAT);
        //        event.rendering = 'background';
        //        event.className = 'availability-' + event.availability;
        //
        //        return event;
        //    },
        //    //eventRender: (event, element, view) => {
        //    //    if(event.note) {
        //    //        element.append('<i class="fa fa-comment"></i>');
        //    //    }
        //    //    //if(view.name == 'month' && (event.start.format('M') !== view.start.format('M'))) { element.addClass('hiddenEvent'); }
        //    //    //this.$timeout(() => {
        //    //    //    element.attr({'tooltip': 'hello!',
        //    //    //        'tooltip-append-to-body': true}); //{'tooltip-html': "'<b>'"}
        //    //    //    this.$compile(element)($scope);
        //    //    //});
        //    //},
        //    isLoading: () => this.isLoading,
        //    loading: isLoading => {
        //        this.isLoading = isLoading;
        //    },
        //    eventAfterAllRender: () => {
        //        //this.loading.isLoading = false;
        //    }
        //};
    }

    getCalendarData(scope) {
        const availabilities = (start, end, timezone, cb) => {
            const query = scope.calendarView === 'me' ? {employeeId: this.AuthenticationService.getCurrentUser().id, start: start.format(AVAILABILITY_DATE_FORMAT), end: end.format(AVAILABILITY_DATE_FORMAT)} : {start: start.format(AVAILABILITY_DATE_FORMAT), end: end.format(AVAILABILITY_DATE_FORMAT)};
            this.AvailabilityModel.initCollection(query).then(() =>
                {this.FormService.onSuccess(scope); cb(this.refreshCalendarData());},
                response => this.FormService.onFailure(scope, response)).finally(() => this.isLoading = false);
        };

        return [availabilities];
    }

    refreshCalendarData() {
        this.uiCalendarConfig.calendars.availability.fullCalendar('removeEvents');
        this.uiCalendarConfig.calendars.availability.fullCalendar('addEventSource', this.AvailabilityModel.getCollection());
    }

    getDatepickerOptions() {
        return {
            'year-format': '\'yy\'',
            'starting-day': 1,
            'show-weeks': false,
            showButtonBar: false,
            minDate: new Date(),
            format: 'dd MMMM yyyy'
        };
    }

    createOrReplaceAvailabilities(dateRangeLength, availability) {
        let i = 0, id, idx, date;
        const availabilities = this.AvailabilityModel.getCollection();
        const startDate = moment(availability.start); // make `availability.start` object immutable for add function

        // delete `start` and `end` date as it should not exist in the back end
        delete availability.end;
        delete availability.start;

        for(i; i < dateRangeLength; i++) {
            // moment(startDate) makes `this.availability.start` object immutable for add function
            date = i ? moment(startDate).add('days', i).format(AVAILABILITY_DATE_FORMAT) : startDate.format(AVAILABILITY_DATE_FORMAT);
            id = `${availability.employeeId}::${date}`;

            idx = availabilities.findIndex(availability => availability.id === id);
            availability = Object.assign({}, availability); // TODO: why Object.assign({id, date}, availability); doesn't set immutable data?
            availability.id = id;
            availability.date = date;

            if(idx > -1) {
                // replace existing availability
                availabilities.splice(idx, 1, availability);
            } else {
                // create new availability
                availabilities.push(availability);
            }
        }

        this.refreshCalendarData();
    }

    getCalendarWeedays() {
        return [
            {id: 'MO', label: 'Mon'}, {id: 'TU', label: 'Tue'}, {id: 'WE', label: 'Wed'},
            {id: 'TH', label: 'Thu'}, {id: 'FR', label: 'Fri'}, {id: 'SA', label: 'Sat'},
            {id: 'SU', label: 'Sun'}
        ];
    }
}

export default AvailabilityService;

// !!http://fajitanachos.com/Fullcalendar-and-recurring-events/
// http://dba.stackexchange.com/questions/91367/is-there-a-best-practice-for-recurring-calendar-events
// http://stackoverflow.com/questions/32736486/recurring-events-in-fullcalendar-with-laravel
// ! https://avocado.io/guacamole/avocado-api#api-calendar-model-recurrencetype
// http://stackoverflow.com/questions/15161654/recurring-events-in-fullcalendar
// http://www.google.ie/imgres?imgurl=http://i.stack.imgur.com/Br1hM.png&imgrefurl=http://stackoverflow.com/questions/20286332/display-next-event-date&h=531&w=739&tbnid=B_AjEe18zKcEOM:&docid=z77t5TXGloWAGM&ei=gOxVVpG-DYquavbQtOAL&tbm=isch&ved=0ahUKEwiR_t2_iazJAhUKlxoKHXYoDbwQMwg9KBQwFA

// google
// https://developers.google.com/google-apps/calendar/v3/reference/events
// https://developers.google.com/google-apps/calendar/recurringevents
// https://developers.google.com/google-apps/calendar/concepts/events-calendars
