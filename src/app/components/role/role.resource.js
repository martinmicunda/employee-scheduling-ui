class RoleResource {
    constructor(Restangular) {
        'ngInject';
        this.Restangular = Restangular;
    }

    getList(query) {
        return this.Restangular
            .all('roles')
            .withHttpConfig({cache: true})
            .getList(query);
    }
}

export default RoleResource;
