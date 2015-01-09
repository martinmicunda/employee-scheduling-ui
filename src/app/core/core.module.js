import FooterController from './layout/footer/layout.footer.controller';
import {coreConfig} from './config/core.config';

import coreTestModule from './config/core.config.test';

export default angular.module('app.core', [coreTestModule.name])
    .config(coreConfig)
    .controller('FooterController', FooterController);
