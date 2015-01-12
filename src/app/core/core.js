import FooterController from './layout/footer/layout.footer.controller';
import {onConfig} from './config/config';

import coreTestModule from './config/config.test';

export default angular.module('app.core', [coreTestModule.name])
    .config(onConfig)
    .controller('FooterController', FooterController);
