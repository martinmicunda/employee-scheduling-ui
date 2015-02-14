'use strict';

class UnsavedFormsService {
    constructor() {
        this.forms = [];
    }

    add(form) {
        this.forms.push(form);
    }

    remove(form) {
        var index = this.forms.indexOf(form);

        this.forms.splice(index, 1);
    }

    areFormsClean() {
        let areAllFormsClean = true;

        for(let form of this.forms) {
            // `true` if user has already interacted with the form
            if (form.$dirty) {
                areAllFormsClean = false;
            } else {
                // remove any non dirty form from `forms` array
                this.remove(form);
            }
        }

        return areAllFormsClean;
    }
}

/**
 * @ngInject
 */
function mmUnsavedFormWarningModal($modal, $state, UnsavedFormsService) {
    'ngInject';

    let directive = {
        require: '^form',
        restrict: 'A',
        scope:{
            resetForm: '&mmUnsavedFormWarningModal'
        },
        link: link
    };
    return directive;

    function link(scope, element, attrs, formCtrl) { // jshint unused: false
        UnsavedFormsService.add(formCtrl);

        // alerts the user when he tries to change the state with unsaved changes
        var onRouteChangeOff = scope.$on('$stateChangeStart', function(event, toState) {// jshint unused: false
            if (!UnsavedFormsService.areFormsClean()) {
                $modal.open({
                    templateUrl: 'unsavedWarningModal.html',
                    controller: ['$modalInstance', '$state', function($modalInstance, $state) {
                        var vm = this;

                        vm.ok = function() {
                            $modalInstance.close();
                            onRouteChangeOff(); // stop listening for location changes
                            $state.go(toState.name);
                            UnsavedFormsService.remove(formCtrl);
                            scope.resetForm(); // reset form scope
                        };

                        vm.cancel = function() {
                            $modalInstance.dismiss('cancel');
                        };
                    }],
                    controllerAs: 'vm'
                });

                // prevent navigation by default since we'll handle it
                // once the user selects a dialog option
                event.preventDefault();
            }
        });
    }
}

export default angular.module('mm.unsavedFormWarningModal', [])
    .directive('mmUnsavedFormWarningModal', mmUnsavedFormWarningModal)
    .service('UnsavedFormsService', UnsavedFormsService);
