class EmployeesAddController {
    constructor(languages, positions, roles, EmployeeResource) {
        this.EmployeeResource = EmployeeResource;
        this.employee = {};
        this.languages = languages;
        this.positions = positions;
        this.roles = roles;
        this.profileComplete = EmployeeResource.calculateProfileCompleteness({});
    }

}

export default EmployeesAddController;
