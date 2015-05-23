'use strict';

import positionsModule from './positions/positions';
import locationsModule from './locations/locations';
import languageModule from './language/language';

import settingsRoute from './settings.route';

export default angular.module('app.settings', [
    positionsModule.name,
    locationsModule.name,
    languageModule.name
]).config(settingsRoute);
