class EmployeesScheduleController {
    constructor($modalInstance) {
        this.$modalInstance = $modalInstance;
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }
}
EmployeesScheduleController.$inject = ['$modalInstance'];

export default EmployeesScheduleController;
