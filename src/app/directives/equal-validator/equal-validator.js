/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Directive} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Directive({
    selector: 'mm-equal-validator'
})
//end-non-standard
class MmEqualValidator {
    constructor() {
        this.require = 'ngModel';
        this.restrict = 'A';
        this.scope =  {
            mmEqualValidator: '='
        };
    }

    link(scope, element, attrs, ngModel) {
        scope.$watch('mmEqualValidator', () => {
            ngModel.$validate();
        });
        ngModel.$validators.equal = function(value) {
            return scope.mmEqualValidator === value;
        };
    }

    static directiveFactory() {
        MmEqualValidator.instance = new MmEqualValidator();
        return MmEqualValidator.instance;
    }
}

export default MmEqualValidator;
