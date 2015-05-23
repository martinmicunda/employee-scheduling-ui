/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   The MIT License {@link http://opensource.org/licenses/MIT}
 */
'use strict';

import passwordRoute from './password.route';

export default angular.module('app.account.password', [])
    .config(passwordRoute);
