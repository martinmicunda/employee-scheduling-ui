class EmployeesScheduleController {
    constructor($modalInstance) {
        this.$modalInstance = $modalInstance;
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }
}

export default EmployeesScheduleController;
