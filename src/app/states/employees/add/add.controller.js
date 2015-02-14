class EmployeesAddController {
    constructor(languages, positions, roles, EmployeeResource, $state, $modalInstance) {
        'ngInject';
        this.$modalInstance = $modalInstance;
        this.EmployeeResource = EmployeeResource;
        this.employee = {};
        this.languages = languages;
        this.positions = positions;
        this.roles = roles;
        this.profileComplete = EmployeeResource.calculateProfileCompleteness({});
        this.$state = $state;
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }

    //goToNextSection (isFormValid) {
    //    // If form is valid go to next section
    //    //if(isFormValid) {
    //    //    this.$state.go(nextState(this.$state.current.name));
    //    //}
    //}

}

export default EmployeesAddController;
