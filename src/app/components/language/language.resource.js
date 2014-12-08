class LanguageResource {
    constructor(Restangular) {
        this.Restangular = Restangular;
    }

    getList() {
        return this.Restangular
            .all('languages')
            .withHttpConfig({cache: true})
            .getList();
    }
}

export default LanguageResource;
