function mmScrollUp($location, $anchorScroll) {
    'use strict';

    let directive = {
        restrict: 'AC',
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        element.on('click', function() {
            $location.hash(attrs.uiScroll);
            $anchorScroll();
        });
    }
}

export default angular.module('mmScrollUp', [])
    .directive('mmScrollUp', mmScrollUp);
