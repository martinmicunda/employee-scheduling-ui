'use strict';

function scheduleRoute($stateProvider) {

    $stateProvider
        .state('schedule', {
            url: '/schedule',
            templateUrl: 'app/states/schedule/schedule.html'
            //controller: 'LocationsController as vm',
            //resolve: {
            //    locations: function (HierarchiesResource) {
            //        // id `root` will get all hierarchy continents
            //        // `$promise` guarantee that promise will be resolved before controller is loaded
            //        // TODO: (martin) language should be at global scope
            //        return HierarchiesResource.query({id: 'root', language: 'en'}).$promise;
            //    }
            //}
        });
}

export default scheduleRoute;
