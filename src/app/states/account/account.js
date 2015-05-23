import accountDetailsModule from './account-details/account-details';
import contactDetailsModule from './contact-details/contact-details';
import passwordModule from './password/password';

import accountRoute from './account.route';
import AccountController from './account.controller';

export default angular.module('app.account', [
    accountDetailsModule.name,
    contactDetailsModule.name,
    passwordModule.name
]).config(accountRoute)
    .controller('AccountController', AccountController);
