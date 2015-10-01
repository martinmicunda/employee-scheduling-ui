/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './modal-warning-unsaved-form.html!text';
import {Service, Inject, Directive} from '../../ng-decorators'; // jshint unused: false

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
        const index = this.forms.indexOf(form);

        this.forms.splice(index, 1);
    }

    areFormsClean() {
        let areAllFormsClean = true;
        let clonedArray = this.forms.slice(0);

        for(let form of clonedArray) {
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
    selector: 'mm-modal-warning-unsaved-form'
})
//end-non-standard
class MmModalWarningUnsavedForm {
    constructor($modal, $state, UnsavedFormsService) {
        this.require = '^form';
        this.restrict = 'A';
        this.scope = {
            resetForm: '&mmModalWarningUnsavedForm'
        };
        MODAL.set(this, $modal);
        STATE.set(this, $state);
        SERVICE.set(this, UnsavedFormsService);
    }

    link(scope, element, attrs, formCtrl) { // jshint unused: false
        SERVICE.get(MmModalWarningUnsavedForm.instance).add(formCtrl);

        // alerts the user when he tries to change the state with unsaved changes
        const onRouteChangeOff = scope.$on('$stateChangeStart', function(event, toState) { // jshint unused: false
            if (!SERVICE.get(MmModalWarningUnsavedForm.instance).areFormsClean()) {
                MODAL.get(MmModalWarningUnsavedForm.instance).open({
                    template: template,
                    controller: ['$modalInstance', '$state', function($modalInstance, $state) {
                        var vm = this;

                        vm.ok = () => {
                            $modalInstance.close();
                            onRouteChangeOff(); // stop listening for location changes
                            $state.go(toState.name);
                            SERVICE.get(MmModalWarningUnsavedForm.instance).remove(formCtrl);
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
        MmModalWarningUnsavedForm.instance = new MmModalWarningUnsavedForm($modal, $state, UnsavedFormsService);
        return MmModalWarningUnsavedForm.instance;
    }
}

export {UnsavedFormsService, MmModalWarningUnsavedForm};
