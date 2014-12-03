import accountDetailsModule from './account-details/account-details';
import accountSettingsModule from './account-settings/account-settings';
import hourlyRatesModule from './hourly-rates/hourly-rates';

import accountRoute from './account.route';
import AccountController from './account.controller';

export default angular.module('app.account', [
    accountDetailsModule.name,
    accountSettingsModule.name,
    hourlyRatesModule.name
]).config(accountRoute)
    .controller('AccountController', AccountController);
