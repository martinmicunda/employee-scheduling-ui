import accountDetailsRoute from './account-details.route';
import AccountDetailsController from './account-details.controller';

export default angular.module('app.account.account-details', [])
    .config(accountDetailsRoute)
    .controller('AccountDetailsController', AccountDetailsController);
