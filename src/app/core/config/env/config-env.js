(function () {
    'use strict';

    angular.module('app')

    
    .constant('name', "app")
    
    .constant('ENV', {
	"name": "development",
	"apiVersion": "1.0",
	"templateBasePath": "app/"
})
    ;

})();