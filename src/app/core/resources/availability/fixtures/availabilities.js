/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import moment from 'moment';

const employeeId = localStorage.getItem('employee-scheduling-test.user') ? JSON.parse(localStorage.getItem('employee-scheduling-test.user')).id : null;
const availabilities = [
    {
        id: `${employeeId}::${moment().add(1, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(1, 'day').format('YYYYMMDD'),
        note: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        //recurrence: {
        //    freq: 'WEEKLY',
        //    until: new Date(y, m, 27),
        //    weekdays: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] // TODO: migth use number instead string e.g. dayNumberOfWeek: [0, 3, 6]
        //}
    },
    {
        id: `${employeeId}::${moment().add(2, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(2, 'day').format('YYYYMMDD'),
        //recurringAvailabilityId: '1',
        note: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: `${employeeId}::${moment().add(3, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().add(3, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(12, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().add(12, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(13, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().add(13, 'day').format('YYYYMMDD'),
        note: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        id: `${employeeId}::${moment().add(14, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().add(14, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(17, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(17, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(18, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(18, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(23, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().add(23, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(24, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(24, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(25, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(25, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(26, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(26, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().subtract(12, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().subtract(12, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().subtract(13, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().subtract(13, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().subtract(14, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'unavailable',
        date: moment().subtract(14, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().subtract(17, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().subtract(17, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().subtract(18, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().subtract(18, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().subtract(20, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'necessary',
        date: moment().subtract(20, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().subtract(21, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'necessary',
        date: moment().subtract(21, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(43, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(43, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(44, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(44, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(45, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(45, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(46, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(46, 'day').format('YYYYMMDD')
    },
    {
        id: `${employeeId}::${moment().add(47, 'day').format('YYYYMMDD')}`,
        employeeId: employeeId,
        availability: 'available',
        date: moment().add(47, 'day').format('YYYYMMDD')
    }
];

export default availabilities;
