class EmployeesMessageController {
    constructor(employee, $modalInstance) {
        'ngInject';
        this.employee = employee;
        this.email = {to: employee.email};
        this.$modalInstance = $modalInstance;
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = {
            iconsPosition: 'right',
            buttonDefaultText: 'Send',
            buttonSubmittingText: 'Sending',
            buttonSuccessText: 'Sent',
            animationCompleteTime: '1200'
        };
    }

    cancel() {
        this.$modalInstance.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.employee.put().then(function() {
            this.result = 'success';
            this.cancel();
        }.bind(this), function(response) {
            this.result = 'error';
            if(response.status === 409) {
                //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing');
            } else {
                //toaster.pop('error', 'Error:', 'Location could not be updated. Please try again!');
            }
        }.bind(this));
    }
}

export default EmployeesMessageController;
