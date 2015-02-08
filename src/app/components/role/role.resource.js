class RoleResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getList(query) {
        return this.Restangular
            .all('roles')
            .withHttpConfig({cache: true})
            .getList(query);
    }
}
RoleResource.$inject = ['Restangular'];

export default RoleResource;
