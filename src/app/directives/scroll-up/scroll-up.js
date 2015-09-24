/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive, Inject} from '../../ng-decorators'; // jshint unused: false

const LOCATION = new WeakMap();
const ANCHOR_SCROLL = new WeakMap();

//start-non-standard
@Directive({
    selector: 'mm-scroll-up'
})
//end-non-standard
class MmScrollUp {
    constructor($location, $anchorScroll) {
        this.restrict = 'A';
        LOCATION.set(this, $location);
        ANCHOR_SCROLL.set(this, $anchorScroll);
    }

    link(scope, element, attrs) {
        element.on('click', function() {
            LOCATION.get(MmScrollUp.instance).hash(attrs.mmScrollUp);
            ANCHOR_SCROLL.get(MmScrollUp.instance)();
        });
    }

    //start-non-standard
    @Inject('$modal', '$anchorScroll')
    //end-non-standard
    static directiveFactory($location, $anchorScroll){
        MmScrollUp.instance = new MmScrollUp($location, $anchorScroll);
        return MmScrollUp.instance;
    }
}

export default MmScrollUp;
