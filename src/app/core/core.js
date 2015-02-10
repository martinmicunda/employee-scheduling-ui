'use strict';

import FooterController from './layout/footer/layout.footer.controller';
import {onConfig} from './config/config';

import template from './layout/footer/layout.footer.html!text';
import template2 from './layout/header/layout.header.html!text';

import coreTestModule from './config/config.test';

export default angular.module('app.core', [coreTestModule.name])
    .config(onConfig)
    .controller('FooterController', FooterController)
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('app/core/layout/footer/layout.footer.html', template);
        $templateCache.put('app/core/layout/header/layout.header.html', template2);
    }]);
