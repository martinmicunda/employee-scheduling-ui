/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

const date = new Date();
const m = date.getMonth();
const y = date.getFullYear();

const availabilities = [
    {
        id: '1',
        employeeId: '1',
        availability: 'available',
        note: '',
        start: new Date(y, m, 1),
        end: new Date(y, m, 1),
        allDay: true,
        type: 'availability'
    },
    {
        id: '2',
        employeeId: '1',
        availability: 'available',
        note: '',
        start: new Date(y, m, 3),
        end: new Date(y, m, 3),
        allDay: true,
        type: 'availability'
    },
    {
        id: '3',
        employeeId: '1',
        availability: 'unavailable',
        note: '',
        start: new Date(y, m, 12),
        end: new Date(y, m, 12),
        allDay: true,
        type: 'availability'
    },
    {
        id: '4',
        employeeId: '1',
        availability: 'unavailable',
        note: '',
        start: new Date(y, m, 16),
        end: new Date(y, m, 16),
        allDay: true,
        type: 'availability'
    },
    {
        id: '4',
        employeeId: '1',
        availability: 'necessary',
        note: '',
        start: new Date(y, m, 20),
        end: new Date(y, m, 20),
        allDay: true,
        type: 'availability'
    }
];

export default availabilities;
