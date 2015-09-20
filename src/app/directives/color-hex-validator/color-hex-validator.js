/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive} from '../../ng-decorators'; // jshint unused: false
const HEX_REGEXP = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

//start-non-standard
@Directive({
    selector: 'mm-color-hex-validator'
})
//end-non-standard
class MmColorHexValidator {
    constructor() {
        this.require = 'ngModel';
        this.restrict = 'A';
    }

    link(scope, element, attrs, ngModel) {
        ngModel.$validators.hexcode = function(value) {
            if (value) {
                const matches = value.toString().match(HEX_REGEXP);
                return (matches !== null && matches.length > 0);
            } else {
                // allow blank
                return true;
            }

        };
    }

    static directiveFactory() {
        MmColorHexValidator.instance = new MmColorHexValidator();
        return MmColorHexValidator.instance;
    }
}
// test http://www.mkyong.com/regular-expressions/how-to-validate-hex-color-code-with-regular-expression/
