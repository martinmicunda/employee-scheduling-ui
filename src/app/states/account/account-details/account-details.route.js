/**
 * @ngInject
 */
export default function accountDetailsRoute($stateProvider) {
    'use strict';

    return $stateProvider
        .state('account.account-details', {
            url: '/account-details',
            templateUrl: 'app/states/account/account-details/account-details.html',
            controller: 'AccountDetailsController as vm'
            //resolve: {/* @ngInject */
            //    location:function(LocationsResource, $stateParams){
            //        return LocationsResource.get($stateParams.locationId);
            //    }
            //}
        });
}
