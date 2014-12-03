class EmployeeResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    get(id) {
        return this.Restangular
            .one('employees', id)
            .get();
    }
}

export default EmployeeResource;
