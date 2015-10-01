/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './header.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'header'
})
@View({
    template: template
})
@Inject('$state', 'AuthenticationService')
//end-non-standard
class Header {
    constructor($state, AuthenticationService) {
        this.router = $state;
        this.AuthenticationService = AuthenticationService;
    }

    logout() {
        return this.AuthenticationService.logout().then(() => {
            this.router.go('auth.login');
        });
    }
}

export default Header;
