import accountDetailsModule from './account-details/account-details';
import accountSettingsModule from './account-settings/account-settings';
import contactDetailsModule from './contact-details/contact-details';
import bankDetailsModule from './bank-details/bank-details';
import hourlyRatesModule from './hourly-rates/hourly-rates';

import accountRoute from './account.route';
import AccountController from './account.controller';

export default angular.module('app.account', [
    accountDetailsModule.name,
    accountSettingsModule.name,
    contactDetailsModule.name,
    bankDetailsModule.name,
    hourlyRatesModule.name
]).config(accountRoute)
    .controller('AccountController', AccountController);
