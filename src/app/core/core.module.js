import FooterController from './layout/footer/layout.footer.controller';
import {coreConfig, coreRun} from './config/core.config';

let moduleName = 'app.core';

angular.module(moduleName, [])
    .config(coreConfig)
    .run(coreRun)
    .controller('FooterController', FooterController);

export default moduleName;
