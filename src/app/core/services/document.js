/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'DocumentService'
})
//end-non-standard
class DocumentService {
    grantAccess(selectedEmployees, employeesWithoutAccess, employeesWithAccess) {
        if(selectedEmployees.length > 0) {
            const selectedEmployeesTemp = employeesWithoutAccess
                .filter((employee) => selectedEmployees.filter((emp) => emp === employee.id).length > 0);

            selectedEmployeesTemp.forEach((employee) => {
                const index = employeesWithoutAccess.findIndex(employeeWithoutAccess => employee.id === employeeWithoutAccess.id);
                employeesWithoutAccess.splice(index, 1);
            });

            selectedEmployees = [];
            return employeesWithAccess.concat(selectedEmployeesTemp);
        }
    }
}

export default DocumentService;
