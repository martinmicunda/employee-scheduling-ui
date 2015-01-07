function StartFromFilter() {
    'use strict';
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
}

export default angular.module('mm.pagination', [])
    .filter('startFrom', StartFromFilter);
