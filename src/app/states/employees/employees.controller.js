class EmployeesController {
    constructor(employees, languages, positions, roles, EmployeeResource, filterFilter) {
        'ngInject';
        this.EmployeeResource = EmployeeResource;
        this.employees = employees;
        this.filteredEmployees = angular.copy(employees); // TODO: is there way to do that in ES6??
        this.languages = languages;
        this.positions = positions;
        this.roles = roles;
        this.filterField = '';
        this.filterFilter = filterFilter;
        // pagination
        this.currentPage = 1;
        this.employeesPerPage = 10;
        this.listViewTable = true;
    }

    filterEmployees() {
        this.filteredEmployees = this.filterFilter(this.employees, {firstName: this.filterField});
    }

    toggleListView() {
        this.listViewTable = !this.listViewTable;
    }

    deleteEmployee(employee) {
        this.EmployeeResource.delete(employee.id).then(function() {
            this.employees.splice(this.employees.indexOf(employee), 1);
            this.filteredEmployees.splice(this.filteredEmployees.indexOf(employee), 1);
        }.bind(this), function(response) {
            if(response.status === 409) {
                //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing');
            } else {
                //toaster.pop('error', 'Error:', 'Location could not be updated. Please try again!');
            }
        }.bind(this));
    }
}

export default EmployeesController;
