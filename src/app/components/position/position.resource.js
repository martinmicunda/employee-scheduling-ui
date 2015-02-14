class PositionResource {
    constructor(Restangular) {
        'ngInject';
        this.Restangular = Restangular;
    }

    getList(query) {
        return this.Restangular
            .all('positions')
            .withHttpConfig({cache: true})
            .getList(query);
    }
}

export default PositionResource;
