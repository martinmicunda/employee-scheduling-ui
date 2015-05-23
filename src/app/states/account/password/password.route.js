/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import template from './password.html!text';

function passwordRoute($stateProvider) {
    'ngInject';
    return $stateProvider
        .state('account.password', {
            url: '/password',
            template: template
        });
}

export default passwordRoute;
