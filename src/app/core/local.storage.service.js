(function() {
    'use strict';

    angular.module('app').factory('LocalStorageService', function(localStorageService) {

        return {
            setUser: function(user) {
                localStorageService.set('user', user);
            },
            getUser: function() {
                return localStorageService.get('user');
            }
        };

    });

})();
