class AccountDetailsController {
    constructor(employee, positions, roles) {
        this.employeeOrigin = angular.copy(employee); // TODO: is there way to do that in ES6??
        this.employee = employee;
        this.positions = positions;
        this.roles = roles;
        this.isSubmitting = null;
        this.result = null;
        this.saveButtonOptions = {
            iconsPosition: 'right',
            buttonDefaultText: 'Save',
            buttonSubmittingText: 'Saving',
            buttonSuccessText: 'Saved',
            animationCompleteTime: '1500'
        };
    }


    save(isValid, form) {
        if(!isValid) {return;}
        this.isSubmitting = true;
        this.employee.put().then(function() {
            //this.result = 'success';
            form.$setPristine();
        }, function(response) {
            //this.result = 'error';
            if(response.status === 409) {
                //toaster.pop('warning', 'Warning:', 'Another user has updated this location while you were editing');
            } else {
                //toaster.pop('error', 'Error:', 'Location could not be updated. Please try again!');
            }
        });
    }

    reset() {
        this.employee = this.employeeOrigin;
    }
}

export default AccountDetailsController;
