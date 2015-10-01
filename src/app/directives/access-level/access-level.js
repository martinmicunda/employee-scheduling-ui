/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

const NG_IF = new WeakMap();
const AUTHENTICATION_SERVICE = new WeakMap();
//start-non-standard
@Directive({
    selector: 'mm-access-level'
})
//end-non-standard
class MmAccessLevel {
    constructor(ngIfDirective, AuthenticationService) {
        this.priority = ngIfDirective[0].priority;
        this.terminal = ngIfDirective[0].terminal;
        this.restrict = ngIfDirective[0].restrict;
        this.transclude = ngIfDirective[0].transclude;
        NG_IF.set(this, ngIfDirective[0]);
        AUTHENTICATION_SERVICE.set(this, AuthenticationService);
    }

    link(scope, element, attrs) {
        let visibility = false, accessLevels;

        attrs.$observe('mmAccessLevel', (al) => {
            if(al){
                accessLevels = scope.$eval(al);
            }
            updateVisibility();
        });

        function updateVisibility() {
            if(accessLevels) {
                visibility = AUTHENTICATION_SERVICE.get(MmAccessLevel.instance).isAuthorized(accessLevels);
                attrs.ngIf = () => visibility;
            }
        }

        attrs.ngIf = () => visibility;
        NG_IF.get(MmAccessLevel.instance).link.apply(NG_IF.get(MmAccessLevel.instance), arguments);
    }

    //start-non-standard
    @Inject('ngIfDirective', 'AuthenticationService')
    //end-non-standard
    static directiveFactory(ngIfDirective, AuthenticationService) {
        MmAccessLevel.instance = new MmAccessLevel(ngIfDirective, AuthenticationService);
        return MmAccessLevel.instance;
    }
}

export default MmAccessLevel;
