'use strict';

export function onConfig($locationProvider, $provide, $urlRouterProvider, RestangularProvider, localStorageServiceProvider) {
    'ngInject';
    // use "e-scheduling" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
    localStorageServiceProvider.setPrefix('employee-scheduling');

    // overwrite the default behaviour for $uiViewScroll service (scroll to top of the page)
    $provide.decorator('$uiViewScroll', ['$delegate', '$window', function ($delegate, $window) {
        return function () {
            $window.scrollTo(0,0);
        };
    }]);

    /*********************************************************************
     * Route provider configuration based on these config constant values
     *********************************************************************/
        // set restful base API Route
        //RestangularProvider.setBaseUrl('/api/' + env.apiVersion);
    RestangularProvider.setBaseUrl('/api/v1');

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    // for any unmatched url, send to 404 page (Not page found)
    $urlRouterProvider.otherwise('/employees');

    // the `when` method says if the url is `/` redirect to `/dashboard` what is basically our `home` for this application
    $urlRouterProvider.when('/', '/employees');
}

