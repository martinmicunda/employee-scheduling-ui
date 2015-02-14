function mmReallyClick($modal) {
    'use strict';
    'ngInject';
    let directive = {
        restrict: 'EA',
        scope:{
            mmReallyClick: '&'
        },
        link: link
    };
    return directive;

    function link(scope, element) {
        element.bind('click', function() {
            var modalInstance = $modal.open({
                templateUrl: 'deleteModal.html',
                controller: ['$modalInstance', function($modalInstance) {
                    var vm = this;

                    vm.ok = function() {
                        $modalInstance.close();
                    };

                    vm.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                }],
                controllerAs: 'vm'
            });

            modalInstance.result.then(function() {
                scope.mmReallyClick();
            });
        });
    }
}

export default angular.module('mm.mmReallyClickWidget', [])
    .directive('mmReallyClick', mmReallyClick);
