class EmployeesScheduleController {
    constructor($modalInstance) {
        'ngInject';
        this.$modalInstance = $modalInstance;
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }
}

export default EmployeesScheduleController;
