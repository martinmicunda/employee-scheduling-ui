/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject, Directive} from '../../ng-decorator'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'UnsavedFormsService'
})
//end-non-standard
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

const MODAL = new WeakMap();
const STATE = new WeakMap();
const SERVICE = new WeakMap();

//start-non-standard
@Directive({
    selector: 'mm-unsaved-form-warning-modal'
})
//end-non-standard
class MmUnsavedFormWarningModal {
    constructor($modal, $state, UnsavedFormsService) {
        this.require = '^form';
        this.restrict = 'A';
        this.scope = {
            resetForm: '&mmUnsavedFormWarningModal'
        };
        MODAL.set(this, $modal);
        STATE.set(this, $state);
        SERVICE.set(this, UnsavedFormsService);
    }

    link(scope, element, attrs, formCtrl) { // jshint unused: false
        SERVICE.get(MmUnsavedFormWarningModal.instance).add(formCtrl);

        // alerts the user when he tries to change the state with unsaved changes
        const onRouteChangeOff = scope.$on('$stateChangeStart', function(event, toState) { // jshint unused: false
            if (!SERVICE.get(MmUnsavedFormWarningModal.instance).areFormsClean()) {
                MODAL.get(MmUnsavedFormWarningModal.instance).open({
                    templateUrl: 'unsavedWarningModal.html',
                    controller: ['$modalInstance', '$state', function($modalInstance, $state) {
                        var vm = this;

                        vm.ok = () => {
                            $modalInstance.close();
                            onRouteChangeOff(); // stop listening for location changes
                            $state.go(toState.name);
                            SERVICE.get(MmUnsavedFormWarningModal.instance).remove(formCtrl);
                            scope.resetForm(); // reset form scope
                        };

                        vm.cancel = () => $modalInstance.dismiss('cancel');
                    }],
                    controllerAs: 'vm'
                });

                // prevent navigation by default since we'll handle it
                // once the user selects a dialog option
                event.preventDefault();
            }
        });
    }

    //start-non-standard
    @Inject('$modal', '$state', 'UnsavedFormsService')
    //end-non-standard
    static directiveFactory($modal, $state, UnsavedFormsService){
        MmUnsavedFormWarningModal.instance = new MmUnsavedFormWarningModal($modal, $state, UnsavedFormsService);
        return MmUnsavedFormWarningModal.instance;
    }
}
