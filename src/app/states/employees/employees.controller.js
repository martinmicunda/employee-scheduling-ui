class EmployeesController {
    constructor(employees, languages, positions, roles, EmployeeResource, filterFilter) {
        this.EmployeeResource = EmployeeResource;
        this.employees = employees;
        this.languages = languages;
        this.positions = positions;
        this.roles = roles;
        this.filterField = '';
        this.filteredEmployees = employees;
        this.filterFilter = filterFilter;
        // pagination
        this.totalEmployees = employees.length;
        this.currentPage = 1;
        this.employeesPerPage = 10;
    }
// https://github.com/xmlking/spa-starter-kit/blob/757586ee8289f8d7fe5f35b779d4c16acaa0e317/app/views/providers/providers.results.html
    // https://github.com/xmlking/spa-starter-kit/blob/d06d69a8f2ea7696117b4a74c2595f33b19c9aee/app/scripts/drug/controllers/DrugResultsController.js
    filterEmployees() {
        this.filteredEmployees = this.filterFilter(this.employees, {firstName: this.filterField});
    }

}

export default EmployeesController;
