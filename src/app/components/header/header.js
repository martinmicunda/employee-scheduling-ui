'use strict';

import template from './header.html!text';
import {View, Component} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'header'
})
@View({
    template: template
})
//end-non-standard
class Header {}
