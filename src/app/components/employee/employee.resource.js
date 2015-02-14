class EmployeeResource {
    constructor(Restangular) {
        'ngInject';
        this.Restangular = Restangular;
    }

    get(id) {
        return this.Restangular
            .one('employees', id)
            .get();
    }

    getList() {
        return this.Restangular
            .all('employees')
            .getList();
    }

    delete(id) {
        return this.Restangular
            .one('employees', id)
            .remove();
    }

    objectKeys(object) {
        return Object.keys(this.Restangular.stripRestangular(object));
    }

    emptyObjectPropertiesCounter(object) {
        let i = 0;
        for(let key in object) {
            if(object.hasOwnProperty(key) && !object[key]) {
                i++;
            }
            if(typeof object[key] === 'object') {
                i = this.emptyObjectPropertiesCounter(object[key]) + i;
            }
        }

        return i;
    }

    calculateProfileCompleteness(employee) {
        employee = this.Restangular.stripRestangular(employee);
        // -3 because (employee (-employee.contactDetails - employee.bankDetails - employee.hourlyRates) - passwords)
        // employee contains 3 nested objects and we also don't count passwords fields as they are always empty
        let totalObjectProperties = (this.objectKeys(employee).length + this.objectKeys(employee.contactDetails).length + this.objectKeys(employee.bankDetails).length + this.objectKeys(employee.hourlyRates).length) - 3;
        let totalEmptyObjectProperties = this.emptyObjectPropertiesCounter(this.Restangular.stripRestangular(employee));

        return (((totalObjectProperties - totalEmptyObjectProperties) * 100)/ totalObjectProperties).toFixed(0);
    }
}

export default EmployeeResource;
