class AccountController {
    constructor(employee, EmployeeResource) {
        'ngInject';
        this.EmployeeResource = EmployeeResource;
        this.employee = employee;
        this.profileComplete = EmployeeResource.calculateProfileCompleteness(employee);
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = {
            iconsPosition: 'right',
            buttonDefaultText: 'Save',
            buttonSubmittingText: 'Saving',
            buttonSuccessText: 'Saved',
            animationCompleteTime: '1200'
        };
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;
        this.profileComplete = this.EmployeeResource.calculateProfileCompleteness(this.employee);
        this.employee.put().then(function(employee) {
            this.employee = employee;
            this.result = 'success';
            form.$setPristine();
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

export default AccountController;
