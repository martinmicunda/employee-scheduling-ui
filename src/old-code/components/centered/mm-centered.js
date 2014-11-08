(function() {
    'use strict';

    /**
     * @ngInject
     */
    function centered() {
        return {
            restrict : "ECA",
            transclude : true,
            template :
                '<div class="mm-center-container">' +
                    '<style>' +
                        '.mm-center-container {position: fixed; top:0; left:0; height:100%; width:100%; display:table;}' +
                        '.mm-centered {display: table-cell; vertical-align: middle; text-align: center;}' +
                    '</style>' +
					'<div class="mm-centered" ng-transclude>' +
				    '</div>' +
			    '</div>'
        };
    }

    angular
        .module('mm.centered', [])
        .directive('centered', centered);

})();
