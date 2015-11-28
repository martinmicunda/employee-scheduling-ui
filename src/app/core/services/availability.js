/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import moment from 'moment';
import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'AvailabilityService'
})
@Inject('$state', '$window', 'localStorageService', 'AvailabilityModel', 'uiCalendarConfig')
//end-non-standard
class AvailabilityService {
    constructor($state, $window, localStorageService, AvailabilityModel, uiCalendarConfig) {
        const date = new Date();
        const m = date.getMonth();
        const y = date.getFullYear();
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
        this.$window = $window;
        this.AvailabilityModel = AvailabilityModel;
        this.localStorageService = localStorageService;
        this.uiCalendarConfig = uiCalendarConfig;
    }

    getCalendarConfig() {
        const height = Math.max(600, this.$window.innerHeight - 220);
        let loading = false;

        return {
            contentHeight: 600,
            selectable: true,
            editable: true,
            header: {
                left: '',
                center: 'title',
                right: 'today prev,next'
            },
            firstDay: 1, // start week on Monday
            allDayDefault: true,
            select: (start, end) => {
                let availability = this.AvailabilityModel.getCollection().find(event => moment(start).isSame(event.start, 'day'));
                if(availability) {
                    this.router.go('app.availability.edit', {id: availability.id});
                } else {
                    availability = {
                        end: new Date(end),
                        start: new Date(start),
                        availability: 'available' // TODO: this data should be only in parent document
                    };
                    this.localStorageService.set('availability', availability);
                    this.AvailabilityModel.setItem(availability);
                    this.router.go('app.availability.add');
                }
            },
            dayRender: (date, cell) => {
                const eventExists = this.events.find(event => moment(date).isSame(event.start, 'day'));
                if(eventExists) {
                    cell.addClass('availability-event');
                }
            },
            eventDataTransform: event => {
                event.rendering = 'background';
                event.className = 'availability-' + event.availability;

                return event;
            },
            //eventRender: function(event, element, view) {
            //    //console.log(event);
            //    //if(view.name == 'month' && (event.start.format('M') !== view.start.format('M'))) { element.addClass('hiddenEvent'); }
            //},
            isLoading: () => loading,
            loading: isLoading => {
                loading = isLoading;
            },
            eventAfterAllRender: () => {
                //this.loading.isLoading = false;
            }
        };
    }

    getCalendarData() {
        const availabilities = (start, end, timezone, cb) =>
            this.AvailabilityModel.initCollection({start: start.format(), end: end.format()}).then(() =>
                cb(this.refreshCalendarData()));

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

    getCalendarDays() {
        return [
            {id: 'Mon', label: 'Mon'}, {id: 'Tue', label: 'Tue'}, {id: 'Wed', label: 'Wed'},
            {id: 'Thu', label: 'Thu'}, {id: 'Fri', label: 'Fri'}, {id: 'Sat', label: 'Sat'},
            {id: 'Sun', label: 'Sun'}
        ];
    }
}

export default AvailabilityService;
